import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { createKeluarga } from '../actions/keluargaAction';
import { KELUARGA_CREATE_RESET } from '../constants/keluargaConstants';

const CreateKeluarga = ({ history }) => {
  const dispatch = useDispatch();

  const [no_kk, setNo_kk] = useState('');
  const [nama_kepala, setNama_kepala] = useState('');
  const [alamat, setAlamat] = useState('Lingkungan I');
  const [kode_pos, setKode_pos] = useState('');
  const [RW, setRW] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kota, setKota] = useState('');
  const [Provinsi, setProvinsi] = useState('');

  //lihat dari store
  const keluargaCreate = useSelector(state => state.keluargaCreate);
  const { loading, error, success: successCreate } = keluargaCreate;

  //cek store untuk mengetahui state.userLogin darimana
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: KELUARGA_CREATE_RESET });
      history.push('/admin/listkeluarga');
    }
    if (userInfo.pala) {
      setAlamat(userInfo.pala);
    } else {
      setAlamat('Lingkungan I');
    }
  }, [dispatch, successCreate]);

  const submitHandler = event => {
    event.preventDefault();

    dispatch(
      createKeluarga({
        no_kk,
        nama_kepala,
        alamat,
        kode_pos,
        RW,
        kelurahan,
        kecamatan,
        kota,
        Provinsi,
      })
    );
  };

  return (
    <FormContainer>
      {error && (
        <Message variant="danger">
          Keluarga dengan Nomor KK ini telah ada
        </Message>
      )}
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3>Buat Data Keluarga</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="no_kk">
              <Form.Label>Nomor KK</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nomor KK"
                value={no_kk}
                onChange={e => setNo_kk(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="noKtp">
              <Form.Label>Kepala Rumah Tangga</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Kepala Rumah Tangga"
                value={nama_kepala}
                onChange={e => setNama_kepala(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            {!userInfo.pala ? (
              <Form.Group controlId="alamat">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  value={alamat}
                  onChange={e => setAlamat(e.target.value)}
                >
                  <option value="Lingkungan I">Lingkungan I</option>
                  <option value="Lingkungan II">Lingkungan II</option>
                  <option value="Lingkungan III">Lingkungan III</option>
                  <option value="Lingkungan IV">Lingkungan IV</option>
                  <option value="Lingkungan V">Lingkungan V</option>
                  <option value="Lingkungan VI">Lingkungan VI</option>
                  <option value="Lingkungan VII">Lingkungan VII</option>
                  <option value="Lingkungan VII">Lingkungan VII</option>
                  <option value="Lingkungan XI">Lingkungan XI</option>
                  <option value="Lingkungan X">Lingkungan X</option>
                  <option value="Lingkungan XI">Lingkungan XI</option>
                  <option value="Lingkungan XII">Lingkungan XII</option>
                </Form.Control>
              </Form.Group>
            ) : (
              <Form.Group controlId="lingkungan">
                <Form.Label>Lingkungan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Lingkungan"
                  value={userInfo.pala}
                  disabled
                ></Form.Control>
              </Form.Group>
            )}

            <Form.Group controlId="kode_pos">
              <Form.Label>Kode Pos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Kode Pos"
                value={kode_pos}
                onChange={e => setKode_pos(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="RW">
              <Form.Label>RW</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan RW"
                value={RW}
                onChange={e => setRW(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="kelurahan">
              <Form.Label>Kelurahan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Kelurahan"
                value={kelurahan}
                onChange={e => setKelurahan(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="kecamatan">
              <Form.Label>Kecamatan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Kecamatan"
                value={kecamatan}
                onChange={e => setKecamatan(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="kota">
              <Form.Label>Kota</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Kota"
                value={kota}
                onChange={e => setKota(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="Provinsi">
              <Form.Label>Provinsi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Provinsi"
                value={Provinsi}
                onChange={e => setProvinsi(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Buat
            </Button>
          </Form>
        </>
      )}
    </FormContainer>
  );
};

export default CreateKeluarga;
