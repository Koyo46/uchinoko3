import LoginLinks from '@/app/LoginLinks'

export const metadata = {
    title: 'Laravel',
}

const Home = () => {
    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <LoginLinks />
                <h1 className="text-3xl font-bold underline">
                    Hello world!
                </h1>
            </div>
        </>
    )
}

export default Home
