---
title: ARIMA回归
tag: ARIMA
categories:
  - 计算机笔记
  - 时间序列分析
typora-copy-images-to: upload
abbrlink: '8381'
date: 2024-12-24 22:12:33
---



```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```


```python
data = pd.read_csv("../data/Turbine_Data.csv",
                 low_memory=False,
                 parse_dates=["Unnamed: 0"])
data.tail()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
    
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Unnamed: 0</th>
      <th>ActivePower</th>
      <th>AmbientTemperatue</th>
      <th>BearingShaftTemperature</th>
      <th>Blade1PitchAngle</th>
      <th>Blade2PitchAngle</th>
      <th>Blade3PitchAngle</th>
      <th>ControlBoxTemperature</th>
      <th>GearboxBearingTemperature</th>
      <th>GearboxOilTemperature</th>
      <th>...</th>
      <th>GeneratorWinding2Temperature</th>
      <th>HubTemperature</th>
      <th>MainBoxTemperature</th>
      <th>NacellePosition</th>
      <th>ReactivePower</th>
      <th>RotorRPM</th>
      <th>TurbineStatus</th>
      <th>WTG</th>
      <th>WindDirection</th>
      <th>WindSpeed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>118219</th>
      <td>2020-03-30 23:10:00+00:00</td>
      <td>70.044465</td>
      <td>27.523741</td>
      <td>45.711129</td>
      <td>1.515669</td>
      <td>1.950088</td>
      <td>1.950088</td>
      <td>0.0</td>
      <td>59.821165</td>
      <td>55.193793</td>
      <td>...</td>
      <td>58.148777</td>
      <td>39.008931</td>
      <td>36.476562</td>
      <td>178.0</td>
      <td>13.775785</td>
      <td>9.234004</td>
      <td>2.0</td>
      <td>G01</td>
      <td>178.0</td>
      <td>3.533445</td>
    </tr>
    <tr>
      <th>118220</th>
      <td>2020-03-30 23:20:00+00:00</td>
      <td>40.833474</td>
      <td>27.602882</td>
      <td>45.598573</td>
      <td>1.702809</td>
      <td>2.136732</td>
      <td>2.136732</td>
      <td>0.0</td>
      <td>59.142038</td>
      <td>54.798545</td>
      <td>...</td>
      <td>57.550367</td>
      <td>39.006759</td>
      <td>36.328125</td>
      <td>178.0</td>
      <td>8.088928</td>
      <td>9.229370</td>
      <td>2.0</td>
      <td>G01</td>
      <td>178.0</td>
      <td>3.261231</td>
    </tr>
    <tr>
      <th>118221</th>
      <td>2020-03-30 23:30:00+00:00</td>
      <td>20.777790</td>
      <td>27.560925</td>
      <td>45.462045</td>
      <td>1.706214</td>
      <td>2.139664</td>
      <td>2.139664</td>
      <td>0.0</td>
      <td>58.439439</td>
      <td>54.380456</td>
      <td>...</td>
      <td>57.099335</td>
      <td>39.003815</td>
      <td>36.131944</td>
      <td>178.0</td>
      <td>4.355978</td>
      <td>9.236802</td>
      <td>2.0</td>
      <td>G01</td>
      <td>178.0</td>
      <td>3.331839</td>
    </tr>
    <tr>
      <th>118222</th>
      <td>2020-03-30 23:40:00+00:00</td>
      <td>62.091039</td>
      <td>27.810472</td>
      <td>45.343827</td>
      <td>1.575352</td>
      <td>2.009781</td>
      <td>2.009781</td>
      <td>0.0</td>
      <td>58.205413</td>
      <td>54.079014</td>
      <td>...</td>
      <td>56.847239</td>
      <td>39.003815</td>
      <td>36.007805</td>
      <td>190.0</td>
      <td>12.018077</td>
      <td>9.237374</td>
      <td>2.0</td>
      <td>G01</td>
      <td>190.0</td>
      <td>3.284468</td>
    </tr>
    <tr>
      <th>118223</th>
      <td>2020-03-30 23:50:00+00:00</td>
      <td>68.664425</td>
      <td>27.915828</td>
      <td>45.231610</td>
      <td>1.499323</td>
      <td>1.933124</td>
      <td>1.933124</td>
      <td>0.0</td>
      <td>58.581716</td>
      <td>54.080505</td>
      <td>...</td>
      <td>56.741040</td>
      <td>39.003815</td>
      <td>35.914062</td>
      <td>203.0</td>
      <td>14.439669</td>
      <td>9.235532</td>
      <td>2.0</td>
      <td>G01</td>
      <td>203.0</td>
      <td>3.475205</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 22 columns</p>
</div>




```python
data.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 118224 entries, 0 to 118223
    Data columns (total 22 columns):
     #   Column                        Non-Null Count   Dtype              
    ---  ------                        --------------   -----              
     0   Unnamed: 0                    118224 non-null  datetime64[ns, UTC]
     1   ActivePower                   94750 non-null   float64            
     2   AmbientTemperatue             93817 non-null   float64            
     3   BearingShaftTemperature       62518 non-null   float64            
     4   Blade1PitchAngle              41996 non-null   float64            
     5   Blade2PitchAngle              41891 non-null   float64            
     6   Blade3PitchAngle              41891 non-null   float64            
     7   ControlBoxTemperature         62160 non-null   float64            
     8   GearboxBearingTemperature     62540 non-null   float64            
     9   GearboxOilTemperature         62438 non-null   float64            
     10  GeneratorRPM                  62295 non-null   float64            
     11  GeneratorWinding1Temperature  62427 non-null   float64            
     12  GeneratorWinding2Temperature  62449 non-null   float64            
     13  HubTemperature                62406 non-null   float64            
     14  MainBoxTemperature            62507 non-null   float64            
     15  NacellePosition               72278 non-null   float64            
     16  ReactivePower                 94748 non-null   float64            
     17  RotorRPM                      62127 non-null   float64            
     18  TurbineStatus                 62908 non-null   float64            
     19  WTG                           118224 non-null  object             
     20  WindDirection                 72278 non-null   float64            
     21  WindSpeed                     94595 non-null   float64            
    dtypes: datetime64[ns, UTC](1), float64(20), object(1)
    memory usage: 19.8+ MB



```python
ig, ax = plt.subplots()
ax.scatter(data["Unnamed: 0"][:1000], data["ActivePower"][:1000])
```




    <matplotlib.collections.PathCollection at 0x72912e32a800>




​    
![png](https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403204135795.png)
​    



```python
data.ActivePower.plot.hist()
```




    <Axes: ylabel='Frequency'>




​    
![png](https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403204135796.png)
​    



```python
data['DateTime'] = data['Unnamed: 0'] 
data.drop('Unnamed: 0', axis=1, inplace=True) # 删除原始列 axis=1表示列 inplace=True表示在原数据上修改
data['DateTime'].head(20)

```




    0    2017-12-31 00:00:00+00:00
    1    2017-12-31 00:10:00+00:00
    2    2017-12-31 00:20:00+00:00
    3    2017-12-31 00:30:00+00:00
    4    2017-12-31 00:40:00+00:00
    5    2017-12-31 00:50:00+00:00
    6    2017-12-31 01:00:00+00:00
    7    2017-12-31 01:10:00+00:00
    8    2017-12-31 01:20:00+00:00
    9    2017-12-31 01:30:00+00:00
    10   2017-12-31 01:40:00+00:00
    11   2017-12-31 01:50:00+00:00
    12   2017-12-31 02:00:00+00:00
    13   2017-12-31 02:10:00+00:00
    14   2017-12-31 02:20:00+00:00
    15   2017-12-31 02:30:00+00:00
    16   2017-12-31 02:40:00+00:00
    17   2017-12-31 02:50:00+00:00
    18   2017-12-31 03:00:00+00:00
    19   2017-12-31 03:10:00+00:00
    Name: DateTime, dtype: datetime64[ns, UTC]




```python
data['DateTime'] = pd.to_datetime(data['DateTime'], 
 format = '%Y-%m-%dT%H:%M:%SZ', 
 errors = 'coerce') # 如果在日期时间转换过程中遇到错误，将错误值转换为 NaT，处理不规则或无效日期时间数据

data['year'] = data['DateTime'].dt.year
data['month'] = data['DateTime'].dt.month
data['day'] = data['DateTime'].dt.day
data['hour'] = data['DateTime'].dt.hour
data['minute'] = data['DateTime'].dt.minute
data.drop('DateTime', axis=1, inplace= True)
```


```python
data
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
    
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>ActivePower</th>
      <th>AmbientTemperatue</th>
      <th>BearingShaftTemperature</th>
      <th>Blade1PitchAngle</th>
      <th>Blade2PitchAngle</th>
      <th>Blade3PitchAngle</th>
      <th>ControlBoxTemperature</th>
      <th>GearboxBearingTemperature</th>
      <th>GearboxOilTemperature</th>
      <th>GeneratorRPM</th>
      <th>...</th>
      <th>RotorRPM</th>
      <th>TurbineStatus</th>
      <th>WTG</th>
      <th>WindDirection</th>
      <th>WindSpeed</th>
      <th>year</th>
      <th>month</th>
      <th>day</th>
      <th>hour</th>
      <th>minute</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>G01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>2017</td>
      <td>12</td>
      <td>31</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>G01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>2017</td>
      <td>12</td>
      <td>31</td>
      <td>0</td>
      <td>10</td>
    </tr>
    <tr>
      <th>2</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>G01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>2017</td>
      <td>12</td>
      <td>31</td>
      <td>0</td>
      <td>20</td>
    </tr>
    <tr>
      <th>3</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>G01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>2017</td>
      <td>12</td>
      <td>31</td>
      <td>0</td>
      <td>30</td>
    </tr>
    <tr>
      <th>4</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>G01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>2017</td>
      <td>12</td>
      <td>31</td>
      <td>0</td>
      <td>40</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>118219</th>
      <td>70.044465</td>
      <td>27.523741</td>
      <td>45.711129</td>
      <td>1.515669</td>
      <td>1.950088</td>
      <td>1.950088</td>
      <td>0.0</td>
      <td>59.821165</td>
      <td>55.193793</td>
      <td>1029.870744</td>
      <td>...</td>
      <td>9.234004</td>
      <td>2.0</td>
      <td>G01</td>
      <td>178.0</td>
      <td>3.533445</td>
      <td>2020</td>
      <td>3</td>
      <td>30</td>
      <td>23</td>
      <td>10</td>
    </tr>
    <tr>
      <th>118220</th>
      <td>40.833474</td>
      <td>27.602882</td>
      <td>45.598573</td>
      <td>1.702809</td>
      <td>2.136732</td>
      <td>2.136732</td>
      <td>0.0</td>
      <td>59.142038</td>
      <td>54.798545</td>
      <td>1030.160478</td>
      <td>...</td>
      <td>9.229370</td>
      <td>2.0</td>
      <td>G01</td>
      <td>178.0</td>
      <td>3.261231</td>
      <td>2020</td>
      <td>3</td>
      <td>30</td>
      <td>23</td>
      <td>20</td>
    </tr>
    <tr>
      <th>118221</th>
      <td>20.777790</td>
      <td>27.560925</td>
      <td>45.462045</td>
      <td>1.706214</td>
      <td>2.139664</td>
      <td>2.139664</td>
      <td>0.0</td>
      <td>58.439439</td>
      <td>54.380456</td>
      <td>1030.137822</td>
      <td>...</td>
      <td>9.236802</td>
      <td>2.0</td>
      <td>G01</td>
      <td>178.0</td>
      <td>3.331839</td>
      <td>2020</td>
      <td>3</td>
      <td>30</td>
      <td>23</td>
      <td>30</td>
    </tr>
    <tr>
      <th>118222</th>
      <td>62.091039</td>
      <td>27.810472</td>
      <td>45.343827</td>
      <td>1.575352</td>
      <td>2.009781</td>
      <td>2.009781</td>
      <td>0.0</td>
      <td>58.205413</td>
      <td>54.079014</td>
      <td>1030.178178</td>
      <td>...</td>
      <td>9.237374</td>
      <td>2.0</td>
      <td>G01</td>
      <td>190.0</td>
      <td>3.284468</td>
      <td>2020</td>
      <td>3</td>
      <td>30</td>
      <td>23</td>
      <td>40</td>
    </tr>
    <tr>
      <th>118223</th>
      <td>68.664425</td>
      <td>27.915828</td>
      <td>45.231610</td>
      <td>1.499323</td>
      <td>1.933124</td>
      <td>1.933124</td>
      <td>0.0</td>
      <td>58.581716</td>
      <td>54.080505</td>
      <td>1029.834789</td>
      <td>...</td>
      <td>9.235532</td>
      <td>2.0</td>
      <td>G01</td>
      <td>203.0</td>
      <td>3.475205</td>
      <td>2020</td>
      <td>3</td>
      <td>30</td>
      <td>23</td>
      <td>50</td>
    </tr>
  </tbody>
</table>
<p>118224 rows × 26 columns</p>
</div>




```python
data.isna().sum()
```




    ActivePower                     23474
    AmbientTemperatue               24407
    BearingShaftTemperature         55706
    Blade1PitchAngle                76228
    Blade2PitchAngle                76333
    Blade3PitchAngle                76333
    ControlBoxTemperature           56064
    GearboxBearingTemperature       55684
    GearboxOilTemperature           55786
    GeneratorRPM                    55929
    GeneratorWinding1Temperature    55797
    GeneratorWinding2Temperature    55775
    HubTemperature                  55818
    MainBoxTemperature              55717
    NacellePosition                 45946
    ReactivePower                   23476
    RotorRPM                        56097
    TurbineStatus                   55316
    WTG                                 0
    WindDirection                   45946
    WindSpeed                       23629
    year                                0
    month                               0
    day                                 0
    hour                                0
    minute                              0
    dtype: int64




```python
# 中位数替代缺失值，_is_missing标记缺失
for label, content in data.items():
    if pd.api.types.is_numeric_dtype(content): # 判断是否为数值型
        if pd.isnull(content).sum():
            data[label+"_is_missing"] = pd.isnull(content)
            data[label] = content.fillna(content.median())
```
