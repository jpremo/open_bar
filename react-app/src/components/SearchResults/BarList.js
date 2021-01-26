import BusinessBox from './BusinessBox'
import './HomePage.css'
function BarList({ barList, name }) {
    if (!barList || barList.length === 0) return (
        <>

            <div className='list-box'>
                <h1>{name}</h1>
                <div>
                    <h2>No Results</h2>
                </div>
            </div>

        </>
    )
    return (
        <div className='list-box'>
            <h1>{name}</h1>
            {barList.map((el, ind) => {
                return (
                    <BarBox business={el} key={ind} />
                )
            })}
        </div>
    )
}

export default BarList
