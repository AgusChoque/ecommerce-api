interface updateProductDto {
    id: number,
    newData: {
        name?: string
        description?: string
        price?: number
        stock?: boolean
        imgUrl?: string
    }
};

export default updateProductDto;