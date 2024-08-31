import UserProfileForm from '@/forms/user-profile-form/UserProfileForm'

export default function UserProfilePage() {
    return (
        <UserProfileForm onSave={function (userProfileData: { name: string; address: string; city: string; country: string; email?: string | undefined }): void {
            throw new Error('Function not implemented.')
        }} isLoading={undefined} />
    )
}
