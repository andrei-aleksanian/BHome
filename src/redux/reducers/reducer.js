import BurgerBuilderReducer from "./BurgerBuilderReducer";
import FormProcessingReducer from "./FormProcessingReducer";
import OrdersPageReducer from "./OrdersPageReducer";
import AuthReducer from "./AuthReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    BurgerBuilder: BurgerBuilderReducer,
    FormProcessing: FormProcessingReducer,
    OrdersPage: OrdersPageReducer,
    AuthReducer: AuthReducer,
});

export default rootReducer;