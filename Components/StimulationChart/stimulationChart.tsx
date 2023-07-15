import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import allCycles from "../Cycles/xetaStakingCycle/allCycles";
import landAllCycles from "../Cycles/landStakingCycle/landAllCycles";
import style from "./style.module.scss";

function StimulationChart(props: any) {
  const { userConnected } = useSelector((state: any) => state.user);
  const { address: addresses } = useSelector(
    (state: any) => state.providerReducer
  );
  const [zone, setZone] = useState("");
  const [xetaTreasure, setXetaTreasure]: any = useState();
  const [time, setTime] = useState(0);
  let timeout: any;
  const [landTreasure, setLandTreasure]: any = useState();
  const currentCycle = allCycles?.cycles[0]?.cycle;
  const category: any = {
    A: "TOP 10%",
    B: "TOP 30%",
    C: "TOP 50%",
    D: "TOP 80%",
    E: "BOTTOM 80%",
  };
  useEffect(() => {
    timeout = setInterval(() => {
      setTime((time) => time + 1);
    }, 60000);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  useEffect(() => {
    if (addresses) {
      checkZone();
    }
  }, [time]);

  const ConditionalCyclesData = () => {
    const xetaData = allCycles[currentCycle];
    const xetaTreasureFound = Object.keys(xetaData).map((item) => {
      return {
        ...xetaData[item],
        rewards: [],
        hasClaimed: [],
        key: item,
      };
    });
    setXetaTreasure(xetaTreasureFound);
    const landData = landAllCycles[currentCycle];
    const landTreasureFound = Object.keys(landData).map((item) => {
      return {
        ...landData[item],
        rewards: [],
        hasClaimed: [],
        key: item,
      };
    });
    setLandTreasure(landTreasureFound);
  };

  const TableData: any = {
    xetaHeader: ["STAKE RANK", "MAX LIMIT", "XETA STAKING"],
    landHeader: ["STAKE RANK", "MAX LIMIT", "LAND STAKING"],
  };

  useEffect(() => {
    if (addresses && userConnected && props?.cycle) {
      checkZone();
    }
  }, [userConnected, addresses, props?.cycle]);

  useEffect(() => {
    ConditionalCyclesData();
  }, []);

  const checkZone = async () => {
    if (userConnected) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_V1_ENDPOINT}/staking/user-prob-category-camapign?campaign=${props?.cycle}&userAddr=${addresses}&type=${props.chartFor}`
        )
        .then((response: any) => {
          const success = response?.data?.success;
          const result = response?.data?.data?.category;
          if (success) {
            setZone(result);
          } else {
            setZone("");
          }
        })
        .catch((err) => {
          setZone("");
        });
    }
  };

  return (
    <section className={`${style["stimulation-wrap"]}`}>
      <h3 className={`${style["h3"]}`}>
        <span className={`${style["green-text"]}`}>XANA</span> Staking CYCLE -{" "}
        {props.cycle}
      </h3>
      <h6 className={`${style["zone"]}`}>
        {userConnected ? (
          <>
            " You are now currently at {' '} 
            <span className={`${style["pink-text"]}`}>
              {zone ? category[zone] : category["E"]} zone
            </span> "
            
          </>
        ) : (
          "Please Connect To wallet To See Your Zone !"
        )}
      </h6>

      <div className={`${style["table-stimulation-wrap"]}`}>
        {userConnected && (
          <Table bordered className={`${style["table-stimulation"]}`}>
            <thead>
              <tr className={`${style["pink-text"]}`}>
                {props.chartFor === "xeta"
                  ? TableData?.xetaHeader?.map((head: any) => <th>{head}</th>)
                  : TableData?.landHeader?.map((head: any) => <th>{head}</th>)}
              </tr>
            </thead>
            <tbody className={`${style["white-text"]}`}>
              {props.chartFor === "xeta"
                ? xetaTreasure?.map((xeta: any) => (
                    <tr>
                      <td className={`${style["green-text"]}`}>
                        {xeta.stands}
                      </td>
                      <td>{xeta.limit}</td>
                      <td>{xeta.title + " " + xeta.title1}</td>
                    </tr>
                  ))
                : landTreasure?.map((land: any) => (
                    <tr>
                      <td className={`${style["green-text"]}`}>
                        {land.stands}
                      </td>
                      <td>{land.limit}</td>
                      <td>{land.title + " " + land.title1}</td>
                    </tr>
                  ))}
              <tr>
                <td className={`${style["green-text"]}`}>BOTTOM 80%</td>
                <td>NO REWARD</td>
                <td>NO REWARD</td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>
    </section>
  );
}

export default StimulationChart;
