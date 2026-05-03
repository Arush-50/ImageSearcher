import "../styles/toast.css"

const Toast = ({ isFor }) => {
    return (
        <>
            {isFor === 'add' && (
                <div className="addToast">
                    <i className="ri-bookmark-fill"></i>
                    <div>
                        <h2>Image Added!</h2>
                        <p>Image added to favourites successfully.</p>
                    </div>
                </div>
            )}
            {isFor === 'remove' && (
                <div className="removeToast">
                    <i className="ri-bookmark-line"></i>
                    <div>
                        <h2>Image Removed!</h2>
                        <p>Image removed from favourites successfully.</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Toast