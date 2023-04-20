import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import Chart from "../../components/chart/Chart";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export const MY_URL = 'https://api-x920.onrender.com'

export default function Home() {
  
  const navigate = useNavigate();
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("user") == "undefined" || !localStorage.getItem("user")) {
      navigate('/login')
    }
    
  },[navigate])

  useEffect(() => {
    const getStats = async () => {
      try {
       const res = await axios.get(`${MY_URL}/users/stats`, {
          headers: {
            token: `bearer ${JSON.parse(localStorage.getItem("user")).token}`
          },
        })
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        })
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New Users": item.total },
          ])
        );
      } catch (error) {
        console.log(error)
      }
    }
    getStats()
  }, [MONTHS])
  

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New Users"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}