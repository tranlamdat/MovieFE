import { useCallback, useState } from "react";
import "./SearchForm.css";
import PropTypes from "prop-types";
import actorApi from "../../../api/actorApi";
import handleError from "../../../services/HandleErrors";
import { Button, CloseButton, FloatingLabel, Form, Image, Modal } from "react-bootstrap";
import swalService from "../../../services/SwalService";
import movieActorApi from "../../../api/movieActorApi";

const SearchForm = ({ formData, setFormData, errorListActors }) => {
    const [query, setQuery] = useState('');
    const [filteredRecommendations, setFilteredRecommendations] = useState([]);
    const [show, setShow] = useState(false);
    const [currentActor, setCurrentActor] = useState({});

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
        const isExist = formData.listActors.some((actor) => actor.actor.actorId === item.actorId);
        if (!isExist) {
            setCurrentActor({ actor: item });
            handleShow();
        }
    };

    const handleEditActor = (actor) => {
        setCurrentActor(actor);
        handleShow();
    };

    const handleRemoveActor = async (movieActor) => {
        const removeActorFromList = () => {
            setFormData((previousState) => ({
                ...previousState,
                listActors: previousState.listActors.filter((item) => item.actor.actorId !== movieActor.actor.actorId),
            }));
        };

        if (movieActor.movieActorId) {
            swalService.confirmDelete(async () => {
                try {
                    await movieActorApi.Remove(movieActor.movieActorId);
                    removeActorFromList();
                } catch (error) {
                    handleError.showError(error);
                }
            });
        } else {
            removeActorFromList();
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setCurrentActor((previousState) => {
            return { ...previousState, characterName: value };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(currentActor)
        if (currentActor.movieActorId) {
            setFormData((previousState) => {
                return {
                    ...previousState,
                    listActors: previousState.listActors.map((item) => item.movieActorId === currentActor.movieActorId ? currentActor : item),
                };
            });
        } else {
            setFormData((previousState) => {
                return {
                    ...previousState,
                    listActors: [...previousState.listActors, currentActor],
                };
            })
        }
        handleClose();
        setCurrentActor({});
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

            {formData.listActors.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mt-3">
                    {formData.listActors.map((item, idx) => (
                        <div className="character-wrapper" key={idx} onClick={() => handleEditActor(item)}>
                            <div className="text-center">
                                <Image
                                    src={item.actor.avatarUrl}
                                    alt={item.actor.name}
                                    width={100}
                                    height={100}
                                    roundedCircle
                                    style={{ objectFit: "cover" }}
                                />
                                <h6>{item.actor.name} ({item.characterName})</h6>
                            </div>
                            <CloseButton className="bg-light" onClick={() => handleRemoveActor(item)} />
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
                                value={currentActor.characterName}
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
    formData: PropTypes.object,
    setFormData: PropTypes.func,
    errorListActors: PropTypes.string,
}

export default SearchForm;
