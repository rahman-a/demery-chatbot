import React, {useEffect} from 'react'
import Navbar from '../../components/Navbar'
import style from './style.module.scss'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import {Link} from 'react-router-dom'
import {listAllWriters} from '../../actions/writerAction'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'

const Writers = () => {
    const dispatch = useDispatch()
    const {loading, error, writers} = useSelector(state => state.writers)

    useEffect(() => {
        dispatch(listAllWriters())
    }, [dispatch])
    return (
        <>
        <Navbar/>
        {
            loading 
            ? <Loader size='25' center/>
            : error 
            ?<Alert variant='danger'>{error}</Alert>
            :<div className={style.writers}>
                <div className="container">
                    <div className={style.writers__wrapper}>
                        <h1 style={{margin:'3rem 0'}}>Writers Information</h1>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Full Name</th>
                                <th>E-mail Address</th>
                                <th>Phone No</th>
                                <th>Gender</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    writers && writers.map((writer, idx) => {
                                        if(!writer.isAdmin) {
                                        return <tr key={writer._id}>
                                                    <td>{idx}</td>
                                                    <td><Link to={`/info/${writer._id}`}>
                                                            {writer.userName}
                                                        </Link>
                                                    </td>
                                                    <td>{writer.fullName}</td>
                                                    <td>{writer.email}</td>                                
                                                    <td>{writer.phone}</td>                                
                                                    <td>{writer.gender}</td>
                                                </tr>
                                        }
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Writers
