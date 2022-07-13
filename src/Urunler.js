import React, { Component } from "react";
import { Table,Button } from "reactstrap";
class Urunler extends Component {
    render() {
        return (
            <div>
                <h1>Ürünler</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ürün Adı</th>
                            <th>Fiyat</th>
                            <th>Stok</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.props.urunler.map((urun) => (
                                <tr key={urun.id}>
                                    <td>{urun.id}</td>
                                    <td>{urun.urunAdi}</td>
                                    <td>{urun.fiyat}₺</td>
                                    <td>{urun.stok}</td>
                                    <td><Button color="success" onClick={()=>this.props.sepeteEkle(urun)}>Sepete Ekle</Button></td>
                                </tr>
                            ))
                            }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Urunler;
