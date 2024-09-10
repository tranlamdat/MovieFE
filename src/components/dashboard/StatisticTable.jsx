import { MEDIA_TYPE } from "../../utils/constant";
import DynamicDataTable from "../table/DynamicDataTable";
import PropTypes from "prop-types";

const StatisticTable = ({ data }) => {
    const columns = [
        {
            name: "ID",
            selector: (row) => row.movieId,
            grow: 0,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row.title,
            maxWidth: "400px",
            sortable: true,
        },
        {
            name: "Release Date",
            selector: (row) => row.releaseDate,
            maxWidth: "200px",
            sortable: true,
        },
        {
            name: "Duration",
            selector: (row) => row.duration,
            maxWidth: "150px",
            sortable: true,
            cell: row => (
                <div>
                    {row.duration} minutes
                </div>
            ),
        },
        {
            name: "National",
            selector: (row) => row.national,
            maxWidth: "150px",
            sortable: true,
        },
        {
            name: "Genre",
            selector: (row) => row.genre.name,
            maxWidth: "150px",
            sortable: true,
        }, {
            name: "Director",
            selector: (row) => row.director.name,
            maxWidth: "200px",
            sortable: true,
        },
        {
            name: 'Poster',
            grow: 0,
            cell: row => (
                <div className="my-2">
                    <img height="51px" width="34px" alt={row.name} src={row.movieMedias.find((media) => media.type == MEDIA_TYPE.POSTER).url} />
                </div>
            ),
        },
    ];

    return (
        <DynamicDataTable columns={columns} rows={data}></DynamicDataTable>
    )
}

StatisticTable.propTypes = {
    data: PropTypes.array,
};

export default StatisticTable