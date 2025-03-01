interface updateUserDto {
    id: string
    newData: {
        email?: string
        name?: string
        password?: string
        address?: string
        phone?: number
        country?: string
        city?: string
    }
}

export default updateUserDto;