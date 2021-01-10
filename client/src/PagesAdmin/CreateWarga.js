import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormContainer from '../components/FormContainer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { createWarga } from '../actions/wargaAction';
import { WARGA_CREATE_RESET } from '../constants/wargaConstants';
import '../App.css';

const DetailWarga = ({ history }) => {
  const dispatch = useDispatch();

  const [nama, setNama] = useState('');
  const [no_ktp, setNo_ktp] = useState('');
  const [no_keluarga, setNo_keluarga] = useState('');
  const [agama, setAgama] = useState('Kristen');
  const [t_lahir, setT_lahir] = useState('');
  const [tanggal_lahir, setTanggal_lahir] = useState(new Date());
  const [j_kelamin, setJ_kelamin] = useState('Perempuan');
  const [lingkungan, setLingkungan] = useState('Lingkungan I');
  const [gol_darah, setGol_darah] = useState('A');
  const [w_negara, setW_negara] = useState('');
  const [pendidikan, setPendidikan] = useState('Tidak/Belum Sekolah');
  const [pekerjaan, setPekerjaan] = useState('Belum/Tidak Bekerja');
  const [s_nikah, setS_nikah] = useState('Menikah');
  const [status, setStatus] = useState('Hidup');
  const [listKeluarga, setListKeluarga] = useState([]);

  //lihat dari store
  const wargaListDetails = useSelector(state => state.wargaListDetails);
  const { loading, error } = wargaListDetails;

  //lihat dari store
  const wargaCreate = useSelector(state => state.wargaCreate);
  const { success: successCreate, error: errorCreate } = wargaCreate;

  //cek store untuk mengetahui state.userLogin darimana
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  console.log(agama);

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: WARGA_CREATE_RESET });
      history.push('/admin/listwarga');
    }
    const fetchKeluarga = async () => {
      const response = await axios.get('/api/listkeluarga');

      setListKeluarga(response.data);
    };
    fetchKeluarga();

    if (userInfo.pala) {
      setLingkungan(userInfo.pala);
    } else {
      setLingkungan('Lingkungan I');
    }
  }, [dispatch, listKeluarga, history, successCreate]);

  const submitHandler = event => {
    event.preventDefault();

    dispatch(
      createWarga({
        nama,
        no_ktp,
        no_keluarga,
        agama,
        t_lahir,
        tanggal_lahir: new Date(tanggal_lahir),
        j_kelamin,
        lingkungan,
        gol_darah,
        w_negara,
        pendidikan,
        pekerjaan,
        s_nikah,
        status,
      })
    );
  };

  const kId = listKeluarga.splice(0, 0, {
    _id: 'Pilih Nomor KK',
    no_kk: 'Pilih Nomor KK',
  });

  return (
    <FormContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h3>Buat Data Penduduk</h3>
          {errorCreate && (
            <Message variant="danger">
              Penduduk dengan nomor NIK ini sudah ada
            </Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama"
                value={nama}
                onChange={e => setNama(e.target.value)}
                placeholderTextColor={'black'}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="noKtp">
              <Form.Label>Nomor NIK</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nomor ktp"
                value={no_ktp}
                onChange={e => setNo_ktp(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="agama">
              <Form.Label>Agama</Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={agama}
                onChange={e => setAgama(e.target.value)}
              >
                <option value="Kristen">Kristen</option>
                <option value="Islam">Islam</option>
                <option value="Khatolik">Khatolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="tLahir">
              <Form.Label>Tempat Lahir</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Tempat Lahir"
                value={t_lahir}
                onChange={e => setT_lahir(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="tanggalLahir">
              <Form.Label>Tanggal Lahir</Form.Label>
              <br />
              <DatePicker
                selected={tanggal_lahir}
                onChange={date => setTanggal_lahir(date)}
              />
            </Form.Group>
            <Form.Group controlId="JenisKelamin">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={j_kelamin}
                onChange={e => setJ_kelamin(e.target.value)}
              >
                <option value="Perempuan">Perempuan</option>
                <option value="Laki-Laki">Laki-Laki</option>
              </Form.Control>
            </Form.Group>
            {!userInfo.pala ? (
              <Form.Group controlId="lingkungan">
                <Form.Label>Lingkungan</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  value={lingkungan}
                  onChange={e => setLingkungan(e.target.value)}
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
            <Form.Group controlId="gol_darah">
              <Form.Label>Golongan Darah</Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={gol_darah}
                onChange={e => setGol_darah(e.target.value)}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="w_negara">
              <Form.Label>Warga Negara</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Warga Negara"
                value={w_negara}
                onChange={e => setW_negara(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="pendidikan">
              <Form.Label>Pendidikan</Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={pendidikan}
                onChange={e => setPendidikan(e.target.value)}
              >
                <option value="Tidak/Belum Sekolah">Tidak/Belum Sekolah</option>
                <option value="SD/Sederajat">SD/Sederajat</option>
                <option value="SMP/Sederajat">SMP/Sederajat</option>
                <option value="SMA/Sederajat">SMA/Sederajat</option>
                <option value="Diploma I/II">Diploma I/II</option>
                <option value="Akademia/Diploma III/S. Muda">
                  Akademia/Diploma III/S. Muda
                </option>
                <option value="Diploma IV/Strata I">Diploma IV/Strata I</option>
                <option value="Diploma IV/Strata I">Diploma IV/Strata I</option>
                <option value="Strata II">Strata II</option>
                <option value="Strata III">Strata III</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="pekerjaan">
              <Form.Label>Pekerjaan</Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={pekerjaan}
                onChange={e => setPekerjaan(e.target.value)}
              >
                <option value="Belum/Tidak Bekerja">Belum/Tidak Bekerja</option>
                <option value="Mengurus Rumah Tangga">
                  Mengurus Rumah Tangga
                </option>
                <option value="Pelajar/Mahasiswa">Pelajar/Mahasiswa</option>
                <option value="Pegawai Negeri Sipil (PNS)">
                  Pegawai Negeri Sipil (PNS)
                </option>
                <option value="Tentara Nasional Indonesia (TNI)">
                  Tentara Nasional Indonesia (TNI)
                </option>
                <option value="Kepolisian RI (POLRI)">
                  Kepolisian RI (POLRI)
                </option>
                <option value="Guru">Guru</option>
                <option value="Wiraswasta">Wiraswasta</option>
                <option value="Karyawan Swasta">Karyawan Swasta</option>
                <option value="Karyawan BUMN">Karyawan BUMN</option>
                <option value="Karyawan Honorer">Karyawan Honorer</option>
                <option value="Supir">Supir</option>
                <option value="Buruh">Buruh</option>
                <option value="Perdagangan">Perdagangan</option>
                <option value="Petani/Pekebun">Petani/Pekebun</option>
                <option value="Pedagang">Pedagang</option>
                <option value="Nelayan">Nelayan</option>
                <option value="Konstruksi">Konstruksi</option>
                <option value="Lainnya">Lainnya</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="s_nikah">
              <Form.Label>Status Nikah</Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={s_nikah}
                onChange={e => setS_nikah(e.target.value)}
              >
                <option value="Menikah">Menikah</option>
                <option value="Belum Menikah">Belum Menikah</option>
                <option value="Cerai Hidup">Cerai Hidup</option>
                <option value="Cerai Mati">Cerai Mati</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option value="Hidup">Hidup</option>
                <option value="Mati">Mati</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="keluarga">
              <Form.Label>Keluarga</Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={no_keluarga}
                onChange={e => setNo_keluarga(e.target.value)}
              >
                {listKeluarga.map(keluarga => (
                  <option value={keluarga._id}>{keluarga.no_kk}</option>
                ))}
              </Form.Control>
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

export default DetailWarga;
