import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ChatUser } from '../../lib/client/models/chat.model'
import { EventCreateRoom } from '../../lib/shared/shared.model'
import { CustomSelect, SelectOption } from '../form/CustomSelect'
import { Input } from '../form/Input'
import { Label } from '../form/Label'
import { Modal } from '../modal/Modal'
import * as Yup from 'yup'

type ChatNewRoomsProps = {
  users: ChatUser[]
  onSubmit: (roomParams: EventCreateRoom) => void
  loggedUser: ChatUser | null
}

const validationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required('Name is required'),
    select: Yup.array().length(1, 'Please select open room or chose users'),
  })
}

export const ChatNewRooms = ({
  users,
  onSubmit,
  loggedUser,
}: ChatNewRoomsProps) => {
  const [usersOptions, setUsersOptions] = useState<SelectOption[]>([])
  const [isOpen, setOpen] = useState<boolean>(false)
  const { control, handleSubmit, watch, setValue, formState, reset } = useForm<{
    name: string
    select: SelectOption[]
  }>({
    resolver: yupResolver(validationSchema()),
    defaultValues: { name: '', select: [] },
  })
  const { errors } = formState

  const onSubmitForm = ({
    name,
    select,
  }: {
    name: string
    select: SelectOption[]
  }) => {
    let participants: string[] = []
    const isOpen = select.find(({ value }) => value === 'open')

    if (!isOpen) {
      participants = select.map(({ value }) => value)
    }

    onSubmit({
      roomName: name,
      isPrivate: !isOpen,
      participants,
    })
    onCancel()
  }

  const onCancel = () => {
    reset()
    setOpen(false)
  }

  const mapUsers = (users: ChatUser[]) =>
    users.reduce<SelectOption[]>((filtered, { email }) => {
      if (email !== loggedUser?.email) {
        filtered.push({ value: email, label: email })
      }
      return filtered
    }, [])

  useEffect(() => {
    const options: SelectOption[] = mapUsers([...users])

    setUsersOptions(options)
  }, [users])

  return (
    <>
      <button
        onClick={() => {
          setOpen(true)
        }}
        type="button"
        className="inline-flex px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Add room
        <PlusCircleIcon className="ml-2 h-4 w-4" />
      </button>

      <Modal
        title="Add new rom"
        open={isOpen}
        onCancel={onCancel}
        onConfirm={handleSubmit(onSubmitForm)}
      >
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Label label="Name">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Insert name of chat"
                  error={errors['name']?.message}
                  {...field}
                />
              )}
            />
          </Label>
          <Label label="Invite Users" />
          <Label label="Open Room" inline={true} revers={true}>
            <input
              className="mr-4 ml-2"
              type={'checkbox'}
              value={'open'}
              checked={!!watch('select')?.find(({ value }) => value === 'open')}
              onChange={(event) => {
                setValue(
                  'select',
                  event.target.checked ? [{ value: 'open', label: 'Open' }] : []
                )
              }}
            />
          </Label>
          {!watch('select')?.find(({ value }) => value === 'open') && (
            <Controller
              name="select"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  options={[...usersOptions]}
                  isMulti={true}
                  error={errors['select']?.message}
                  {...field}
                />
              )}
            />
          )}
        </form>
      </Modal>
    </>
  )
}
