---
title: SAS
tags:
  - CUMCM
  - 线性回归
  - SAS
categories:
  - 计算机笔记
  - 数学建模
description: description
cover: https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403215347942.png
abbrlink: 7c80
date: 2024-08-23 14:03:01
---
#  SAS

##　功能介绍

![1724382303004](https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403215347940.png)

## 假设检验

### 功能

总体均值相等的检验，针对两个对象。

### 基本前提条件

总体服从正态分布

### 步骤

①检验总体方差是否相等
$$
\text{原假设}H_0:\sigma _1^2=\sigma _2^2;\text{备择假设}H_1:\sigma _1^2\ne \sigma _2^2
$$
②检验总体均值是否相等
$$
\text{原假设}H_0:\mu _1=\mu _2;\text{备择假设}H_1:\mu _1\ne \mu _2
$$

### 依据

小概率原理(通常`α=0.05`)

## 方差分析

### 功能

各个总体（水平）均值相等的检验，针对多个对象

### 前提

来自正态总体、方差相同

### 步骤

①提出原假设
$$
\mu _1=\mu _2=···=\mu _r
$$
②构造F统计量
③计算统计量的值与临界值比较并下结论

> 均衡数据还是非均衡数据，看所有样本观测值数量是否一样

### 例子

#### 题目

![1724393935718](https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403215347941.png)

#### 结果和分析

![1724393977368](https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403215347942.png)

## 一元线性回归

### 检验

#### 模型

![1724386137831](https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403215347943.png)

#### 目的

检验`y`与解释变量`x`之间的线性关系是否显著

#### 步骤

①提出原假设
$$
\text{原假设}H_1:a=b=0;\text{备择假设}H_2:a,b不全为0
$$
②构造F统计量
③计算统计量的值与临界值比较并下结论
⑤t检验：回归系数显著性检验
⑥R方检验：拟合优度检验

### 例子

#### 题目

![1724395116342](https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403215347944.png)

#### 结果和分析

![1724395311869](https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403215347945.png)

![1724395327802](https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403215347946.png)

> 不能在回归方程`y=0.25695+2.93028x`直接把截距项置零，应修改模型重新计算

