import React, { Component } from "react";
import {Link} from "react-router-dom";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge,
    NavItem,
    NavLink,
} from "reactstrap";
class SepetOnIzleme extends Component {
    render() {
        return (
            <div>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Sepet - {this.props.sepet.length}
                </DropdownToggle>
                <DropdownMenu end>
                    {this.props.sepet.map((s) => (
                        <DropdownItem key={s.urun.id}>
                            <Badge color="danger" onClick={()=>this.props.urunSil(s.urun)}>X</Badge>
                            {" " +s.urun.urunAdi + " "}
                            <Badge color="success">{s.adet}</Badge>
                        </DropdownItem>
                    ))}
                    <DropdownItem divider />
                    <DropdownItem onClick={()=>this.props.sepetiTemizle()}>Sepeti Temizle</DropdownItem>
                    <DropdownItem onClick={()=>this.props.mevcutKategoriKaydet("")}><Link to="/sepet">Sepete Git</Link></DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            </div>
        );
    }
}

export default SepetOnIzleme;