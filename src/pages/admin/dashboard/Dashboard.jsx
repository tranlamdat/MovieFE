import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import movieApi from "../../../api/movieApi";
import formatDateTime from "../../../services/FormatDateTime";
import handleError from "../../../services/HandleErrors";
import { Card } from "react-bootstrap";
import StatisticTable from "../../../components/dashboard/StatisticTable";

const Dashboard = () => {
  const [topMostView, setTopMostView] = useState([]);
  const [topMovieLike, setTopMovieLike] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get top 10 movies
        const [topMostView, topMovieLike] = await Promise.all([
          movieApi.TopMostView(5),
          movieApi.TopMovieLike(5)
        ]);

        // Format date
        topMostView.forEach((res) => {
          res.releaseDate = formatDateTime.toDateString(res.releaseDate);
          res.dateCreated = formatDateTime.toDateTimeString(res.dateCreated);
          res.dateUpdated = formatDateTime.toDateTimeString(res.dateUpdated);
        });

        topMovieLike.forEach((res) => {
          res.releaseDate = formatDateTime.toDateString(res.releaseDate);
          res.dateCreated = formatDateTime.toDateTimeString(res.dateCreated);
          res.dateUpdated = formatDateTime.toDateTimeString(res.dateUpdated);
        });

        // Set data
        setTopMostView(topMostView);
        setTopMovieLike(topMovieLike);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <section className="section dashboard">
        <Card bg="dark" text="white">
          <Card.Body>
            <Card.Title>Top Movie Most View</Card.Title>
            <Card.Text>
              <StatisticTable data={topMostView}></StatisticTable>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card bg="dark" text="white">
          <Card.Body>
            <Card.Title>Top Movie Most Like</Card.Title>
            <Card.Text>
              <StatisticTable data={topMovieLike}></StatisticTable>
            </Card.Text>
          </Card.Body>
        </Card>
      </section>
    </AdminLayout>
  );
};

export default Dashboard;
