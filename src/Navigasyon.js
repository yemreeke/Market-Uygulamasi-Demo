import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import SepetOnIzleme from './SepetOnIzleme';

class Navigasyon extends Component {
    toggle = this.toggle.bind(this);
    state = {
        isOpen: false,
    };
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">{this.props.bilgi.baslik}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ms-auto" navbar>
                            <NavItem>
                                <NavLink target="_blank" href="https://github.com/yemreeke">
                                    GitHub
                                </NavLink>
                            </NavItem>
        
                            <SepetOnIzleme
                                mevcutKategoriKaydet={this.props.mevcutKategoriKaydet}

                                urunSil = {this.props.urunSil}
                                sepet = {this.props.sepet}
                                sepetiTemizle = {this.props.sepetiTemizle}
                            >

                            </SepetOnIzleme>
                        </Nav>
                    </Collapse>
                </Navbar>              
            </div>
        );
    }
}

export default Navigasyon;