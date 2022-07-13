import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
class Kategoriler extends Component {
    render() {
        return (
            <div>
                <ListGroup>
                    {
                    this.props.kategoriler.map((kategori) => (
                        <Link to="/" key={kategori.id}>
                            <ListGroupItem
                                active={
                                    kategori.kategoriIsmi ===
                                    this.props.mevcutKategori.kategoriIsmi
                                        ? true
                                        : false
                                }
                                onClick={() =>
                                    this.props.mevcutKategoriKaydet(kategori)
                                }
                            >
                                {kategori.kategoriIsmi}
                            </ListGroupItem>
                        </Link>
                    ))
                    }
                </ListGroup>
            </div>
        );
    }
}

export default Kategoriler;
