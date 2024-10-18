import Header from '@/app/(app)/Header'
import UpdateProfile from '@/components/UpdateProfile'
export const metadata = {
    title: 'プロフィール',
}

const Profile = () => {
    return (
        <>
            <Header title="プロフィール" />
            <UpdateProfile />
        </>
    )
}

export default Profile