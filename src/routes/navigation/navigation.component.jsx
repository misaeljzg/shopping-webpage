import { Fragment, useContext } from 'react';

import { Outlet, Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { selectCurrentUser } from '../../store/user/user.selector';

import { signOutStart } from '../../store/user/user.action';

import {NavigationContainer, NavLink, NavLinks, LogoContainer} from './navigation.styles';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutUser = () => dispatch(signOutStart());
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser}> SIGN OUT</NavLink>
                    )
                        : (
                            <NavLink to='/auth'>
                                SIGN-IN
                            </NavLink>
                        )
                    }
                    <CartIcon/>
                </NavLinks>
                {isCartOpen && (<CartDropdown/>)}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;