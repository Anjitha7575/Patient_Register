import React, { useEffect, useState } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { useApiFetch } from '../hooks/useApiFetch';
import CustomSlider from './Slider';
import { TabHeaders, sortDataOnKeys, transformData, colorsHex, filterBasedOnKey } from '../constants';
import './Dashboard.css';
const MAX_PAGE = 5;
function Dashboard() {
    const [patientData, setPatientData] = useState([]);
    const [sliderState, setSliderState] = useState(0);
    const [pageNo, setPageNo] = useState(0);
    const fetchData = useApiFetch('https://hapi.fhir.org/baseR4/Patient?_pretty=true&_format=json');
    let { apiData, isLoading, apiDataSuccess, errorMsg } = fetchData;
    let entriesTemp = transformData(_get(apiData, 'entry', []));

    useEffect(() => {
        if (apiDataSuccess) {
            setPatientData(entriesTemp);
        }
    }, [apiDataSuccess])

    const [sortKey, setSortKey] = useState({});



    const setSortKeyItem = (key) => {
        if (key && key === sortKey.key) {
            setSortKey({ ...sortKey, 'order': !sortKey.order });
        } else {
            setSortKey({ key: key, 'order': true })
        }

    }

    useEffect(() => {
        let entriesSorted = sortDataOnKeys(entriesTemp, sortKey);
        setPatientData(entriesSorted);
    }, [sortKey])

    const pageNext = () => {
        setPageNo(pageNo => pageNo + 1);
    }

    const pagePrev = () => {
        setPageNo(pageNo => pageNo - 1);
    }
    const start = pageNo * MAX_PAGE;
    const end = start + MAX_PAGE;
    const apiDataLength = patientData.length;
    const onChangeForSlider=(x)=>{
        setSliderState(x);
    }
    useEffect(() => {
        let entriesFiltered = filterBasedOnKey(entriesTemp, "age", sliderState);
        setPatientData(entriesFiltered);
    }, [sliderState])
    return (
        <div>
            {isLoading ? <div>Loading...</div> :
                errorMsg ? <div>{errorMsg}</div> :
                    <div>
                        <CustomSlider sliderState={sliderState} onChangeForSlider={onChangeForSlider}/>
                        <table>
                            <thead>
                                <tr>
                                    <td></td>
                                    {TabHeaders.map((item) => {
                                        return <td key={item.title}>
                                            <span>{item.title}</span>
                                            <button className='sort' onClick={() => setSortKeyItem(item.key)}>
                                                <i className="fa-solid fa-sort"></i>
                                            </button>
                                        </td>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {(patientData.slice(start, end) || []).map((item, index) => {
                                    return (<tr key={item.id}>
                                        <td><div className='avatar' style={{ backgroundColor: colorsHex[index % colorsHex.length] }}>{(item.name || "").slice(0, 2)}</div></td>
                                        {TabHeaders.map((head) => {
                                            return <td key={head.key}>{item[head.key] || "_"}</td>
                                        })
                                        }
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                        <div className='pagination'>
                            <button disabled={start <= 0} onClick={pagePrev}><i className="fa-solid fa-circle-arrow-left"></i></button>
                            <button disabled={end >= apiDataLength} onClick={pageNext}><i className="fa-solid fa-circle-arrow-right"></i></button>
                        </div>
                    </div>}

        </div>
    );
}

export default React.memo(Dashboard);
