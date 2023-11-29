import { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import NavigationBar from '../../components/NavigationBar';

const AdminView = () => {
    const [users, setUsers] = useState([
        { id: 1, type: 'Estudiante', name: 'a', email: 'estudiante@udi.edu.co' },
        { id: 2, type: 'Encuestador', name: 'a', email: 'pollster@udi.edu.co' },
    ]);

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [editedUserName, setEditedUserName] = useState('');

    const handleEdit = (id) => {
        setShowEditModal(true);
        setSelectedUserId(id);

        const userToEdit = users.find((user) => user.id === id);
        setEditedUserName(userToEdit.email);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedUserId(null);
        setEditedUserName('');
    };

    const handleSaveEdit = () => {

        const updatedUsers = users.map((user) =>
            user.id === selectedUserId ? { ...user, email: editedUserName } : user
        );
        setUsers(updatedUsers);

        handleCloseEditModal();
    };

    const deleteUser = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
    };

    return (
        <div>
            <NavigationBar />
            <div style={{ padding: '20px' }}>
                <h1 style={{ color: '#3498db' }}>Panel de Administrador</h1>
                <Table striped bordered hover variant="light" style={{ marginTop: '20px', backgroundColor: '#FFF' }}>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.type}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button variant="primary" style={{ marginRight: '5px' }} onClick={() => handleEdit(user.id)}>
                                        Editar
                                    </Button>
                                    <Button variant="danger" onClick={() => deleteUser(user.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Modal de Edición */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar correo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="editedUserName">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nuevo Correo"
                                value={editedUserName}
                                onChange={(e) => setEditedUserName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminView;


/*import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import NavigationBar from '../../components/NavigationBar';

const AdminView = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3003/admin')  
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error al obtener usuarios:', error));
    }, []);  

    const deleteUser = (id) => {
        fetch(`https:localhost:3003/admin/users/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                const updatedUsers = users.filter((user) => user.id !== id);
                setUsers(updatedUsers);
            })
            .catch((error) => console.error('Error al eliminar usuario:', error));
    };

    const editUser = (id) => {
        console.log(`Editar usuario con ID: ${id}`);
    };

    return (
        <div>
            <NavigationBar />
            <div style={{ padding: '20px' }}>
                <h1 style={{ color: '#3498db' }}>Panel de Administrador</h1>
                <Table striped bordered hover variant="light" style={{ marginTop: '20px', backgroundColor: '#FFF' }}>
                    <thead style={{ backgroundColor: '#3498db', color: '#FFF' }}>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.type}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button variant="primary" style={{ marginRight: '5px' }} onClick={() => editUser(user.id)}>
                                        Editar
                                    </Button>
                                    <Button variant="danger" onClick={() => deleteUser(user.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default AdminView;*/