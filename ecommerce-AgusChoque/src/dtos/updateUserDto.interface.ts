interface updateUserDto {
    id: number
    newData: {
        email?: string
        name?: string
        password?: string
        address?: string
        phone?: string
        country?: string
        city?: string
    }
}

export default updateUserDto;