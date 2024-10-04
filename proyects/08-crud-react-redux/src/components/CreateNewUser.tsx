import {Card,Button,TextInput,Title} from '@tremor/react'
import { useUserActions } from '../hooks/useUserActions'
import React, { useState } from 'react'

export function CreateNewUser (){

    const {addUser} = useUserActions()


    const handlesubmit = (event)=>{
        event.preventDefault()
        const form = event.target
        const formData = new FormData(form)

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string

        addUser({name,email,github})

        form.reset()
    }

    return(
        <Card style={{marginBottom:'10px'}}>
            <Title>Nuevo Usuario</Title>

            <form onSubmit={handlesubmit}>
                <TextInput placeholder='Nombre' name='name'/>
                <TextInput placeholder='Email' name='email'/>
                <TextInput placeholder='Github'name='github'/>
                <div>
                    <Button type='submit' >Crear Usuario</Button>
                </div>
            </form>
        </Card>
    )
}