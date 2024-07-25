import { useCallback, useState } from "react";
import "./SearchForm.css";
import PropTypes from "prop-types";
import actorApi from "../../../api/actorApi";
import handleError from "../../../services/HandleErrors";
import { Button, CloseButton, FloatingLabel, Form, Image, Modal } from "react-bootstrap";

const SearchForm = ({ listActors, setListActors, errorListActors }) => {
    const [query, setQuery] = useState('');
    const [filteredRecommendations, setFilteredRecommendations] = useState([]);
    const [show, setShow] = useState(false);
    const [currentActor, setCurrentActor] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Debounce function
    const debounce = (func, delay) => {
        let debounceTimer;
        return function (...args) {
            const context = this;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    };

    // Debounce search
    const debounceDropDown = useCallback(debounce(async (nextValue) => {
        try {
            if (nextValue) {
                const filtered = await actorApi.Search(nextValue);
                setFilteredRecommendations(filtered);
                return;
            }

            setFilteredRecommendations([]);
        } catch (error) {
            handleError.showError(error);
        }
    }, 500), []);

    const handleInputChange = (e) => {
        const { value } = e.target;
        setQuery(value);
        debounceDropDown(value);
    };

    const handleRecommendationClick = (item) => {
        const isExist = listActors.some((actor) => actor.actorId === item.actorId);
        if (!isExist) {
            setCurrentActor(item);
            handleShow();
        }
    };

    const handleRemoveActor = (id) => {
        setListActors((previousState) => {
            return previousState.filter((actor) => actor.actorId !== id);
        });
    };

    // Debounce character name
    const debounceCharacterName = useCallback(debounce((nextValue) => {
        setCurrentActor((previousState) => {
            return { ...previousState, characterName: nextValue };
        });
    }, 500), []);

    const handleChange = (event) => {
        const { value } = event.target;
        debounceCharacterName(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setListActors([...listActors, currentActor]);
        handleClose();
        setCurrentActor(null);
        setQuery('');
        setFilteredRecommendations([]);
    };

    return (
        <div className={errorListActors ? 'is-invalid' : ''}>
            <div className="form-group position-relative">
                <input
                    type="text"
                    className="form-control"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search..."
                />
                {filteredRecommendations.length > 0 && (
                    <div id="recommendationList">
                        <ul className="list-group">
                            {filteredRecommendations.map((item) => (
                                <li
                                    key={item.actorId}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handleRecommendationClick(item)}
                                >
                                    <img src={item.avatarUrl} alt={item.name} className="rounded-circle avatar me-2" />
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {listActors.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mt-3">
                    {listActors.map((actor) => (
                        <div className="character-wrapper" key={actor.actorId}>
                            <div className="text-center">
                                <Image
                                    src={actor.avatarUrl}
                                    alt={actor.name}
                                    width={100}
                                    height={100}
                                    roundedCircle
                                    style={{ objectFit: "cover" }}
                                />
                                <h6>{actor.name} ({actor.characterName})</h6>
                            </div>
                            <CloseButton className="bg-light" onClick={() => handleRemoveActor(actor.actorId)} />
                        </div>
                    ))}
                </div>
            )}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <div className="bg-dark text-white">
                    <Modal.Header closeButton closeVariant="white">
                        <Modal.Title>Actor name</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FloatingLabel
                            controlId="floatingCharacterName"
                            label="Character name"
                            className="mb-3 text-secondary"
                        >
                            <Form.Control
                                type="text"
                                onChange={handleChange}
                                placeholder="Character name"
                            />
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" type="submit" onClick={handleSubmit}>Save</Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
}

SearchForm.propTypes = {
    listActors: PropTypes.array,
    setListActors: PropTypes.func,
    errorListActors: PropTypes.string,
}

export default SearchForm;
