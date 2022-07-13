import React, { Component } from "react";
import { Button, Table, Col, Row } from "reactstrap";

class SepetiListele extends Component {
    table() {
        return (
            <div>
                <Table hover striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ürün Adı</th>
                            <th>Fiyatı</th>
                            <th>Adet</th>
                            <th>Arttır</th>
                            <th>Azalt</th>
                            <th>Sil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.sepet.map((s, i) => (
                            <tr key={i}>
                                <td >{i + 1}</td>
                                <td className="w-50">{s.urun.urunAdi}</td>
                                <td className="w-50">{s.urun.fiyat}₺</td>
                                <td>{s.adet}</td>
                                <td>
                                    <Button
                                        color="primary"
                                        onClick={() =>
                                            this.props.urunArttir(s.urun)
                                        }
                                    >
                                        +
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        color="primary"
                                        onClick={() =>
                                            this.props.urunAzalt(s.urun)
                                        }
                                    >
                                        -
                                    </Button>
                                </td>
                                <td >
                                    <Button 
                                        color="danger"
                                        onClick={() =>
                                            this.props.urunSil(s.urun)
                                        }
                                    >
                                        X
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Row className="w-50 ms-auto me-auto gap-2">
                    <Button
                        size="lg"
                        color="secondary"
                        className="ms-3 me-3"
                        disabled
                    >
                        Toplam Fiyat : {this.props.toplamFiyat}₺
                    </Button>
                    <Button
                        size="lg"
                        className="ms-3 me-3"
                        color="danger"
                        onClick={() => this.props.sepetiTemizle()}
                    >
                        Tüm Sepeti Temizle
                    </Button>
                    <Button
                        size="lg"
                        className="ms-3 me-3"
                        color="success"
                       
                    >
                        Satın Al
                    </Button>
                </Row>
            </div>
        );
    }
    render() {
        return (
            <div>
                <h1>Sepet</h1>
                {this.props.sepet.length ? (
                    this.table()
                ) : (
                    <h2>Sepet Boştur!</h2>
                )}
            </div>
        );
    }
}

export default SepetiListele;
