const Cart = () => {
    const items = ["apple", "banana", "grape"]

    return (
        <div>
            <ul>
                {
                    items.map((item, idx) => {
                        return <li key={idx}>{item}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Cart