import { NavLink, useHistory, withRouter } from 'react-router-dom';

export function AppHeader() {
    // const history = useHistory()

    return (
        <header className="app-header">
            <section className="container">
                <section className='logo'>
                    <img src='/imgs/logo.png' alt="" />
                    <h1>My Sugar App</h1>
                </section>
                <nav>
                    <NavLink activeClassName='my-active' exact to='/'>Home</NavLink>
                    <NavLink activeClassName='my-active' to='/statistics'>Statistics</NavLink>
                </nav>
            </section>
        </header>
    )
}