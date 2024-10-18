import Header from '@/app/(app)/Header'
import Timeline from '@/components/Timeline'

export const metadata = {
    title: 'ホーム',
}

const Home = () => {
    return (
        <>
            <Header title="Timeline" />
            <Timeline/>
        </>
    )
}

export default Home