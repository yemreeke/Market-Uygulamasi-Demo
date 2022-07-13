import React, { Component } from "react";
import Kategoriler from "./Kategoriler";
import { Container, Row, Col } from "reactstrap";
import Urunler from "./Urunler";
import Navigasyon from "./Navigasyon";
import { Route, Routes } from "react-router-dom";
import SepetiListele from "./SepetiListele";
import alertify from "alertifyjs";

class App extends Component {
    state = { kategoriler: [], mevcutKategori: "", urunler: [], sepet: [],toplamFiyat:0 };
    componentDidMount() {
        this.kategorileriCek();
        this.urunleriCek();
    }

    kategorileriCek = () => {
        fetch("http://localhost:3001/kategoriler")
            .then((response) => response.json())
            .then((data) => this.setState({ kategoriler: data }));
    };
    urunleriCek = (kategori) => {
        let url = "http://localhost:3001/urunler";
        if (kategori) {
            url += "?kategoriId=" + kategori.id;
        }
        fetch(url)
            .then((response) => response.json())
            .then((data) => this.setState({ urunler: data }));
    };
    mevcutKategoriKaydet = (kategori) => {
        this.setState({ mevcutKategori: kategori });
        this.urunleriCek(kategori);
    };
    sepeteEkle = (urun) => {
        let eskiSepet = this.state.sepet;
        var eklenenUrun = eskiSepet.find((x) => x.urun.id === urun.id);
        if (urun.stok > 0) {
            //Ürünün stoğu en az 1
            if (eklenenUrun) {
                if (eklenenUrun.adet < urun.stok) {
                    eklenenUrun.adet += 1;
                    alertify.success(urun.urunAdi + " sepete eklenmiştir.", 2);
                } else {
                    alertify.error(urun.urunAdi + " ürünü tükenmiştir.", 2);
                }
            } else {
                eskiSepet.push({
                    urun: urun,
                    adet: 1
                });
                alertify.success(urun.urunAdi + " sepete eklenmiştir.", 2);
            }
        }
        this.setState({ sepet: eskiSepet });
        this.fiyatHesapla(eskiSepet);
    };
    fiyatHesapla = (sepet)=>{
        var fiyat = 0
        sepet.map(s=>(
            fiyat +=(s.urun.fiyat * s.adet)
        ))
        this.setState({toplamFiyat:fiyat})
    }
    urunSil = (urun) => {
        let yeniSepet = this.state.sepet.filter((s) => s.urun.id !== urun.id);
        this.setState({ sepet: yeniSepet });
        alertify.error(urun.urunAdi + " başarıyla silinmiştir.", 2);
        this.fiyatHesapla(yeniSepet);
    };
    urunArttir = (urun) => {
        let eskiSepet = this.state.sepet;
        var arttirilcakUrun = eskiSepet.find((x) => x.urun.id === urun.id);
        if(arttirilcakUrun.urun.stok>arttirilcakUrun.adet){
            alertify.warning(urun.urunAdi+" ürün arttırılmıştır.", 2);
            arttirilcakUrun.adet++;
        }
        else{
            alertify.error(urun.urunAdi + " ürünü tükenmiştir.", 2);
        }
        this.setState({ sepet: eskiSepet });
        this.fiyatHesapla(eskiSepet);
    };
    urunAzalt = (urun) => {
        let eskiSepet = this.state.sepet;
        var arttirilcakUrun = eskiSepet.find((x) => x.urun.id === urun.id);
        if(1<arttirilcakUrun.adet){
            alertify.warning(urun.urunAdi + " ürün azaltılmıştır.", 2);
            arttirilcakUrun.adet--;
        }
        else{
            alertify.error("Minimum 1 adet alınabilir.", 2);
        }
        this.setState({ sepet: eskiSepet });
        this.fiyatHesapla(eskiSepet);
    };

    sepetiTemizle = () => {
        this.setState({ sepet: [] });
        alertify.success("Sepet başarıyla temizlenmiştir.", 2);
        this.fiyatHesapla([]);
    };
    render() {
        let navigasyonBilgi = { baslik: "Market Uygulaması" };
        return (
            <div>
                <Container>
                    <Navigasyon
                        urunSil={this.urunSil}
                        sepetiTemizle={this.sepetiTemizle}
                        sepet={this.state.sepet}
                        bilgi={navigasyonBilgi}
                        mevcutKategoriKaydet={this.mevcutKategoriKaydet}

                    />
                    <Row>
                        <Col xs="2">
                            <Kategoriler
                                mevcutKategori={this.state.mevcutKategori}
                                mevcutKategoriKaydet={this.mevcutKategoriKaydet}
                                kategoriler={this.state.kategoriler}
                            />
                        </Col>
                        <Col xs="10">
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <Urunler
                                            sepeteEkle={this.sepeteEkle}
                                            urunler={this.state.urunler}
                                            mevcutKategori={
                                                this.state.mevcutKategori
                                            }
                                        />
                                    }
                                />
                                <Route
                                    path="/sepet"
                                    element={
                                        <SepetiListele
                                            urunSil={this.urunSil}
                                            urunArttir={this.urunArttir}
                                            urunAzalt={this.urunAzalt}
                                            sepetiTemizle={this.sepetiTemizle}
                                            sepet={this.state.sepet}
                                            toplamFiyat = {this.state.toplamFiyat}
                                        ></SepetiListele>
                                    }
                                />
                            </Routes>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
