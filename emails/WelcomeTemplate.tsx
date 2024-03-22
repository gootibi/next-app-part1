import React, { CSSProperties } from 'react'
import { Html, Body, Container, Tailwind, Text, Link, Preview } from '@react-email/components'

const WelcomeTemplate = ({ name }: { name: string }) => {
    return (
        <Html>
            <Preview>Welcome aboard!</Preview>
            <Tailwind>
                <Body className='bg-white'>
                    <Container>
                        <Text className='font-bold text-3xl'>Hello {name}</Text>
                        <Link href='https://www.gsplus.hu/'>www.gamestar.hu</Link>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

// CSS properties add exmp.: <Body style={body}>  -> No use <Tailwind>
const body: CSSProperties = {
    background: '#fff',
}

const text: CSSProperties = {
    fontSize: '32px',
}

export default WelcomeTemplate