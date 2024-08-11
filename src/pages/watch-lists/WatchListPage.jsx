import { useEffect, useState } from "react";
import "./WatchListPage.css";
import BaseLayout from "../../layouts/base/BaseLayout"
import MemberProtected from "../../layouts/base/MemberProtected"
import handleError from "../../services/HandleErrors";
import authService from "../../services/AuthService";
import watchListApi from "../../api/watchListApi";
import MovieCard from "../../components/card/movie/MovieCard";
import swalService from "../../services/SwalService";
import { SWAL_POSITION } from "../../utils/constant";

const WatchListPage = () => {
  const [watchLists, setWatchLists] = useState([]);

  const handleUnfollow = async (watchListId) => {
    try {
      await watchListApi.Remove(watchListId);
      swalService.showCustomPosition("Removed from watch list", "success", SWAL_POSITION.TOP_END);
      setWatchLists(watchLists.filter((item) => item.watchListId !== watchListId));
    } catch (error) {
      handleError.showError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = authService.getUserData();
        const getWatchList = await watchListApi.GetByUserId(user.userId)
        setWatchLists(getWatchList);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <MemberProtected>
      <BaseLayout>
        <section className="container py-4 mt-5">
          <h5 className="heading">My Watch List</h5>
          <div className="row">
            {watchLists.length > 0 ? (
              watchLists.map((item) => (
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0 watch-list-wrapper" key={item.watchListId}>
                  <MovieCard movie={item.movie}></MovieCard>
                  <div className="watch-list badge bg-secondary" onClick={() => handleUnfollow(item.watchListId)}>
                    <i className="bi bi-bookmark-dash-fill"></i>
                    <span className="ms-1">Unfollow</span>
                  </div>
                </div>
              ))
            ) : (
              <figure className="figure empty-watch-list">
                <img src="/img/empty.gif" className="figure-img img-fluid rounded" alt="..." />
                <figcaption className="figure-caption">A caption for the above image.</figcaption>
              </figure>
            )}
          </div>
        </section>
      </BaseLayout>
    </MemberProtected>
  )
}

export default WatchListPage