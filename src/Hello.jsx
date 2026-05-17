import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import axios from "axios";
import "react-calendar-heatmap/dist/styles.css";
export default function Heatmap({ userId }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("📡 Fetching heatmap data for user:", userId);
                const res = await axios.get(`http://localhost:5000/heatmap/${userId}`);
                console.log("✅ Heatmap data from backend:", res.data);
                setData(res.data || []);
            } catch (err) {
                console.error("❌ Error fetching heatmap data:", err);
            }
        };
        if (userId) fetchData();
    }, [userId]);
    const heatmapData = Array.from({ length: 365 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (364 - i));
        const dateStr = date.toISOString().split("T")[0];
        const match = data.find((d) => d.date.split("T")[0] === dateStr);
        return {
            date: dateStr,
            count: match ? match.count : 0,
        };
    });
    return (
        <div
            style={{
                background: "#f9fafb",
                borderRadius: "16px",
                padding: "40px 20px 60px",
                margin: "50px auto",
                width: "95%",
                maxWidth: "900px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                textAlign: "center",
            }}
        >
            <h2
                style={{
                    fontSize: "1.6rem",
                    fontWeight: "700",
                    color: "#24292e",
                    marginBottom: "20px",
                }}
            >
                📆 Learning Activity
            </h2>


            <div
                style={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "20px 25px 40px",
                    overflowX: "auto",
                    boxShadow: "inset 0 0 8px rgba(0,0,0,0.04)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        minWidth: "700px",
                        paddingBottom: "40px",
                        overflow: "visible",
                    }}
                >
                    <CalendarHeatmap
                        startDate={new Date(new Date().setDate(new Date().getDate() - 364))}
                        endDate={new Date()}
                        values={heatmapData}
                        showWeekdayLabels={false}
                        gutterSize={3}
                        horizontal={true}
                        transformDayElement={(rect, value) => {
                            const count = value?.count || 0;
                            const colors = [
                                "#ebedf0",
                                "#9be9a8",
                                "#40c463",
                                "#30a14e",
                                "#216e39",
                            ];
                            const color =
                                count === 0
                                    ? colors[0]
                                    : count === 1
                                        ? colors[1]
                                        : count === 2
                                            ? colors[2]
                                            : count === 3
                                                ? colors[3]
                                                : colors[4];
                            return (
                                rect &&
                                React.cloneElement(rect, {
                                    style: {
                                        fill: color,
                                        width: 11,
                                        height: 11,
                                        rx: 2,
                                        ry: 2,
                                        transform: "translate(1px, 1px)",
                                        transition: "fill 0.2s ease",
                                    },
                                })
                            );
                        }}
                    />
                </div>
            </div>

            <style>
                {`
          .react-calendar-heatmap {
            overflow: visible !important;
          }
          svg {
            height: 130px !important;
            overflow: visible !important;
          }
          .react-calendar-heatmap rect {
            shape-rendering: geometricPrecision;
          }
        `}
            </style>
        </div>
    );
}