interface updateProductDto {
    id: string,
    newData: {
        name?: string
        description?: string
        price?: number
        stock?: number
        imgUrl?: string
    }
};

export default updateProductDto;