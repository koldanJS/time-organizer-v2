import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/actions/userActions'
import { useHttp } from '../../hooks/useHttp'
import { AuthContext } from '../../context/AuthContext'
import ButtonForm from '../../components/UI/ButtonForm/ButtonForm'
import EditUserItem from './EditUserItem/EditUserItem'
import Message from '../../components/UI/Message/Message'
import './EditUserPage.css'

const EditUserPage = () => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const { request, loading } = useHttp()
    const { token } = useContext(AuthContext)
    const [form, setForm] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone
    })
    const [isChange, setIsChange] = useState(false)
    const [message, setMessage] = useState(false)

    const showMessage = () => {
        setTimeout(() => {
            setMessage(false)
        }, 3000);
        return <Message
            message={message.message}
            type={ message.type}
            pageClass='edit-user-page'
        />
    }

    const mainItems = [
        {
            name: 'Имя',
            value: form.firstName,
            placeholder: 'Ваше имя...',
            changeHandler: (event) => {
                setIsChange(true)
                setForm({...form, firstName: event.target.value})
            }
        },
        {
            name: 'Фамилия',
            value: form.lastName,
            placeholder: 'Ваша фамилия...',
            changeHandler: (event) => {
                setIsChange(true)
                setForm({...form, lastName: event.target.value})
            }
        },
        {
            name: 'Рабочая почта',
            value: form.email,
            placeholder: 'Ваш email...',
            changeHandler: () => {},
            type: 'email'
        },
        {
            name: 'Компания',
            value: form.company,
            placeholder: 'Ваше место работы...',
            changeHandler: (event) => {
                setIsChange(true)
                setForm({...form, company: event.target.value})
            }
        }
    ]
    const additionalItems = [
        {
            name: 'День рождения',
            value: form?.dateOfBirth,
            placeholder: 'Ваш день рождения...',
            changeHandler: (event) => {
                setIsChange(true)
                setForm({...form, dateOfBirth: event.target.value})
            },
            type: 'date'
        },
        {
            name: 'Номер телефона',
            value: form?.phone,
            placeholder: 'Ваш номер...',
            changeHandler: (event) => {
                setIsChange(true)
                setForm({...form, phone: event.target.value})
            },
            type: 'tel'
        }
    ]

    const saveChanges = async () => {
        try {
            const data = await request(
                '/api/user',
                'PUT',
                {...form},
                { Authorization: `Bearer ${token}` }
            )
            // Если успешно, показываем, что нет изменений
            setIsChange(false)
            // И меняем state в redux, чтоб изменилось содержимое всех компонентов, без необходимости загружать что-то
            dispatch(setUser(form))
            setMessage({message: data.message, type: 'success'})
        } catch(e) {
            setMessage({message: e.message, type: 'error'})
        }
    }

    return (
        <main>
            <div className='edit-user' >
                <h1 className='text size-30 width-700' >{`Ваша базовая информация, ${user.firstName}`}</h1>
                <EditUserItem
                    label='Основная информация'
                    items={ mainItems }
                />
                <EditUserItem
                    label='Дополнительная информация'
                    items={ additionalItems }
                />
                <div className='edit-user-item'>
                    <hr className='demiliter' />
                    <h3 className='text size-22 width-700' >Статистика</h3>
                    <ul>
                        <li>
                            <p className='text' >{ `Количество проектов, над которыми вы сейчас работаете:` }</p>
                            <p className='text' >{ user.projectsId.length }</p>
                        </li>
                        <li>
                            <p className='text' >{ `Количество задач, над которыми вы сейчас работаете:` }</p>
                            <p className='text' >{ user.tasksId.length }</p>
                        </li>
                    </ul>
                </div>
                <div className='footer' >
                    <ButtonForm
                        classType='success'
                        clickHandler={ saveChanges }
                        disabled={ (!isChange || loading) }
                    >
                        <p className='text' >Сохранить изменения</p>
                    </ButtonForm>
                    {
                        message
                            ? showMessage()
                            : null
                    }
                </div>
            </div>
        </main>
    )
}

export default EditUserPage