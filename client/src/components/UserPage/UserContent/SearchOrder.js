import MapComponent from "../../MapComponent/MapComponent"
import OrderListPovar from "../../Order/OrderList/OrderListPovar"

const SearchOrder = () => {
  return (
    <div className="profile__povar-order">
      <h2 className="profile__title">Поиск Заказов</h2>
      <div className="profile__povarBlock">
        <OrderListPovar />
        <MapComponent className='' />
      </div>
    </div>
  )
}

export default SearchOrder
