import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Users, DollarSign, CreditCard, ShoppingBag, Calendar, Search, ChevronDown, Home } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useSelector } from "react-redux";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [textInput, setTextInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [region, setRegion] = useState('Select Region');
  const user = useSelector((state) => state.auth.user);
  const StatCard = ({ icon: Icon, iconBg, title, value, change, changeType }) => {
    const getChartColor = () => {
      const colorMap = {
        'bg-[#4318FF]': '#4318FF',
        'bg-[#05CD99]': '#05CD99',
        'bg-[#FFB547]': '#FFB547',
        'bg-[#8B5CF6]': '#8B5CF6',
        'bg-[#FF6AD5]': '#FF6AD5',
        'bg-[#01B6FF]': '#01B6FF'
      };
      return colorMap[iconBg] || '#4A90FF';
    };

    const chartColor = getChartColor();
    
    const miniChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false, min: 0 } },
      elements: { line: { tension: 0.4, borderWidth: 2.5 }, point: { radius: 0 } }
    };

    console.log("user :",user)
    const chartConfig = {
      labels: ['', '', '', '', '', '', '', ''],
      datasets: [
        {
          data: [30, 60, 35, 70, 40, 65, 45, 60],
          borderColor: chartColor,
          backgroundColor: chartColor + '26',
          fill: true
        },
        {
          data: [10, 10, 10, 10, 10, 10, 10, 10],
          borderColor: chartColor + '40',
          borderDash: [4, 4],
          backgroundColor: 'transparent',
          fill: false,
          borderWidth: 1.5
        }
      ]
    };

    const getCardBackground = () => {
      const bgColorMap = {
        'bg-[#4318FF]': 'linear-gradient(90deg, #FFFFFF 0%, #EEE5FF 100%)',
        'bg-[#05CD99]': 'linear-gradient(90deg, #FFFFFF 0%, #EAFFF9 100%)',
        'bg-[#FFB547]': 'linear-gradient(90deg, #FFFFFF 0%, #FFF4E5 100%)',
        'bg-[#8B5CF6]': 'linear-gradient(90deg, #FFFFFF 0%, #F3E8FF 100%)',
        'bg-[#FF6AD5]': 'linear-gradient(90deg, #FFFFFF 0%, #FFE5F7 100%)',
        'bg-[#01B6FF]': 'linear-gradient(90deg, #FFFFFF 0%, #E0F7FF 100%)'
      };
      return bgColorMap[iconBg] || 'linear-gradient(90deg, #FFFFFF 0%, #EAFFF9 100%)';
    };

    return (
      <div className="rounded-2xl p-4 shadow-sm border border-[#D1D5DB]" style={{ background: getCardBackground() }}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg}`}>
                <Icon size={20} className="text-white" strokeWidth={2} />
              </div>
              <div
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2 border-white"
                style={{ background: chartColor }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div>
              <p className="text-[16px] text-[#4B5563] font-medium">{title}</p>
              <p className="text-[24px] font-bold text-[#111827] leading-tight">{value}</p>
            </div>
          </div>
          <div className="w-24 h-10">
            <Line data={chartConfig} options={miniChartOptions} />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-[12px] text-[#A3AED0]">Increase by</span>
          <span className={`text-[12px] font-semibold px-2 py-0.5 rounded ${changeType === 'up' ? 'text-[#05CD99] bg-[#05CD99]/10' : 'text-[#EE5D50] bg-[#EE5D50]/10'}`}>
            {changeType === 'up' ? '+' : '-'}{change}
          </span>
          <span className="text-[12px] text-[#A3AED0]">this week</span>
        </div>
      </div>
    );
  };

  const stats = [
    { icon: Users, iconBg: 'bg-[#4318FF]', title: 'New Users', value: '15,000', change: '200', changeType: 'up' },
    { icon: Users, iconBg: 'bg-[#05CD99]', title: 'Active Users', value: '8,000', change: '150', changeType: 'up' },
    { icon: DollarSign, iconBg: 'bg-[#FFB547]', title: 'Total Sales', value: '$5,00,0', change: '35,000', changeType: 'up' },
    { icon: ShoppingBag, iconBg: 'bg-[#8B5CF6]', title: 'Total Couriers', value: '223', change: '18', changeType: 'up' },
    { icon: CreditCard, iconBg: 'bg-[#FF6AD5]', title: 'Total CRM', value: '25000', change: '1,200', changeType: 'up' },
    { icon: DollarSign, iconBg: 'bg-[#01B6FF]', title: 'Total Profit', value: '$3,007,0', change: '160,000', changeType: 'up' }
  ];

  const revenueChartData = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [
      {
        label: 'Revenue',
        data: [15, 50, 25, 55, 30, 60, 40, 50, 75, 195],
        borderColor: '#4A90FF',
        backgroundColor: 'rgba(74, 144, 255, 0.15)',
        fill: true,
        tension: 0.4,
        pointRadius: [0, 0, 0, 0, 0, 8, 0, 0, 0, 0],
        pointBackgroundColor: '#4A90FF',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        borderWidth: 2.5
      },
      {
        data: [95, 95, 95, 95, 95, 95, 95, 95, 95, 95],
        borderColor: '#E0E0E0',
        borderDash: [6, 6],
        backgroundColor: 'transparent',
        fill: false,
        borderWidth: 1,
        pointRadius: 0
      },
      {
        data: [10, 10, 10, 70, 10, 10, 10, 10, 10, 10],
        borderColor: '#E0E0E0',
        borderDash: [6, 6],
        backgroundColor: 'transparent',
        fill: false,
        borderWidth: 1,
        pointRadius: 0
      }
    ]
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#fff', titleColor: '#000', bodyColor: '#000', borderColor: '#E5E7EB', borderWidth: 1, padding: 8, displayColors: false }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: (context) => context.index === 5 ? '#4A90FF' : '#A3AED0',
          font: { size: 14, weight: '500' }
        }
      },
      y: {
        display: false,
        min: 0,
        max: 100
      }
    },
    layout: {
      padding: { top: 5, bottom: 5, left: 0, right: 0 }
    }
  };

  const customerOverviewData = {
    labels: ['Active', 'Expired', 'New'],
    datasets: [{
      data: [500, 500, 1500],
      backgroundColor: ['#22C55E', '#EF4444', '#3B82F6'],
      borderWidth: 4,
      borderColor: '#FFFFFF',
      spacing: 2,
      borderRadius: {
        outerStart: 20,
        outerEnd: 20,
        innerStart: 20,
        innerEnd: 20
      }
    }]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#fff', titleColor: '#000', bodyColor: '#000', borderColor: '#E5E7EB', borderWidth: 1, padding: 6 }
    },
    layout: {
      padding: 0
    },
    cutout: '70%'
  };

  const customerOverviewOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#fff', titleColor: '#000', bodyColor: '#000', borderColor: '#E5E7EB', borderWidth: 1, padding: 6 }
    },
    circumference: 180,
    rotation: 270,
    cutout: '70%',
    spacing: 4
  };

  const paymentStatusData = {
    labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      { label: 'Paid', data: [35000, 28000, 42000, 38000, 32000, 45000, 40000], backgroundColor: '#45B369', borderRadius: 4, barThickness: 8 },
      { label: 'Pending', data: [28000, 32000, 25000, 35000, 28000, 30000, 32000], backgroundColor: '#144BD6', borderRadius: 4, barThickness: 8 },
      { label: 'Overdue', data: [15000, 12000, 18000, 14000, 16000, 20000, 15000], backgroundColor: '#FF9F29', borderRadius: 4, barThickness: 8 }
    ]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#fff', titleColor: '#000', bodyColor: '#000', borderColor: '#E5E7EB', borderWidth: 1, padding: 6 }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#A3AED0', font: { size: 8 } } },
      y: {
        grid: { color: '#F3F4F6', drawBorder: false },
        ticks: { color: '#A3AED0', font: { size: 8 }, callback: (value) => '$' + (value / 1000) + 'k' },
        beginAtZero: true
      }
    },
    layout: {
      padding: { top: 0, bottom: 0, left: 0, right: 0 }
    }
  };

  // Custom plugin for vertical dotted line
  const verticalLinePlugin = {
    id: 'verticalLine',
    afterDraw: (chart) => {
      if (chart.tooltip?._active?.length) {
        const ctx = chart.ctx;
        const activePoint = chart.tooltip._active[0];
        const x = activePoint.element.x;
        const topY = activePoint.element.y;
        const bottomY = chart.scales.y.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#4A90FF';
        ctx.stroke();
        ctx.restore();
      }
    }
  };

  const salesStatData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      data: [3000, 20000, 8000, 30000, 15000, 55000, 25000, 18000, 22000, 12000, 15000, 20000],
      borderColor: '#4A90FF',
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, 'rgba(74, 144, 255, 0.25)');
        gradient.addColorStop(1, 'rgba(74, 144, 255, 0)');
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 8,
      pointBackgroundColor: '#4A90FF',
      pointBorderColor: '#FFFFFF',
      pointBorderWidth: 3,
      pointHoverBorderWidth: 3,
      borderWidth: 2.5
    }]
  };

  const salesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#1F2937',
        bodyColor: '#1F2937',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          title: (items) => {
            const month = items[0].label;
            return `${month} 2024`;
          },
          label: (item) => `  This Month : $${(item.raw / 1000).toFixed(0)}k`,
          labelPointStyle: () => ({
            pointStyle: 'circle',
            rotation: 0
          })
        },
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 4
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: (context) => context.index === 5 ? '#4A90FF' : '#9CA3AF',
          font: { size: 12, weight: '500' }
        }
      },
      y: {
        position: 'left',
        grid: { color: '#F3F4F6', drawBorder: false },
        ticks: {
          color: '#9CA3AF',
          font: { size: 11 },
          callback: (value) => '$' + (value / 1000) + 'k',
          stepSize: 25000
        },
        beginAtZero: true,
        max: 100000
      }
    },
    layout: {
      padding: { top: 10, bottom: 0, left: 0, right: 10 }
    }
  };

  const subscriberData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      data: [65, 75, 70, 90, 68, 72, 60],
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        if (context.dataIndex === 3) {
          const gradient = ctx.createLinearGradient(0, 0, 0, 150);
          gradient.addColorStop(0, '#487FFF');
          gradient.addColorStop(1, 'rgba(72, 127, 255, 0.31)');
          return gradient;
        }
        return '#C7D2FE';
      },
      borderRadius: 8,
      barThickness: 22
    }]
  };

  const subscriberChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: false
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: (context) => context.index === 3 ? '#4318FF' : '#9CA3AF',
          font: { size: 12, weight: '500' }
        },
        border: { display: false }
      },
      y: { display: false }
    }
  };

  // Plugin to show label on highlighted bar
  const barLabelPlugin = {
    id: 'barLabel',
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      const meta = chart.getDatasetMeta(0);
      const bar = meta.data[3]; // Wednesday bar
      const value = chart.data.datasets[0].data[3];

      ctx.save();
      ctx.fillStyle = '#F97316';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(value === 90 ? '20' : value, bar.x, bar.y - 8);
      ctx.restore();
    }
  };

  const usersOverviewData = {
    labels: ['New', 'Subscribed'],
    datasets: [{
      data: [500, 300],
      backgroundColor: ['#487FFF', '#F97316'],
      borderWidth: 4,
      borderColor: '#FFFFFF',
      spacing: 2,
      borderRadius: 4
    }]
  };

  const countries = [
    { name: 'USA', users: '1,240 Users', progress: 80, color: '#4A90FF', flagColors: ['#B22234', '#FFFFFF', '#3C3B6E'] },
    { name: 'Japan', users: '1,240 Users', progress: 60, color: '#F97316', flagColors: ['#FFFFFF', '#BC002D'] },
    { name: 'France', users: '1,240 Users', progress: 49, color: '#FBBF24', flagColors: ['#002395', '#FFFFFF', '#ED2939'] },
    { name: 'Germany', users: '1,240 Users', progress: 100, color: '#22C55E', flagColors: ['#000000', '#DD0000', '#FFCC00'] }
  ];

  const plans = [
    { name: '3 Days - 5 GB', progress: 80, color: '#F97316' },
    { name: '3 Days - 10 GB', progress: 80, color: '#3B82F6' },
    { name: '3 Days - 20 GB', progress: 80, color: '#22C55E' },
    { name: '3 Days - 30 GB', progress: 80, color: '#8B5CF6' }
  ];

  return (
    <div className="min-h-screen bg-app p-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-2.5">
        <div>
          <h1 className="text-[16px] font-bold text-app">Dashboard</h1>
         
        </div>
        
      </div>

      {/* Search Bar Section */}
      <div className="grid grid-cols-12 gap-2 mb-2.5">
        <div className="col-span-3">
          <input
            type="text"
            placeholder="Input Data"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-white border border-[#E0E5F2] rounded-lg text-[10px] text-[#2B3674] placeholder:text-[#A3AED0] focus:outline-none focus:ring-1 focus:ring-[#4318FF]/20"
          />
        </div>
        <div className="col-span-3 relative">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="mm/dd/yyyy"
            dateFormat="MM/dd/yyyy"
            className="w-full px-2.5 py-1.5 bg-white border border-[#E0E5F2] rounded-lg text-[10px] text-[#2B3674] placeholder:text-[#A3AED0] focus:outline-none focus:ring-1 focus:ring-[#4318FF]/20"
          />
          <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A3AED0] pointer-events-none" size={12} />
        </div>
        <div className="col-span-3 relative">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-white border border-[#E0E5F2] rounded-lg text-[10px] text-[#2B3674] appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#4318FF]/20"
          >
            <option>Select Region</option>
            <option>North America</option>
            <option>Europe</option>
            <option>Asia</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A3AED0] pointer-events-none" size={12} />
        </div>
        <div className="col-span-3">
          <button className="w-full px-2.5 py-1.5 bg-[#4318FF] text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5">
            <Search size={12} strokeWidth={2.5} />
            Search
          </button>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        <div className="col-span-2">
          <div className="grid grid-cols-3 gap-2.5 mb-2.5" style={{zoom:0.8}}>
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
        <div className="bg-white srounded-lg p-3 shadow-sm mb-2.5">
          <div className="flex justify-between items-start mb-2.5">
            <div>
              <h3 className="text-[18px] font-semibold text-[#111827]">Revenue Growth</h3>
              <p className="text-[14px] text-[#4B5563] font-medium mt-0.5">Weekly Report</p>
            </div>
            <div className="text-right">
              <p className="text-[18px] font-bold text-[#2B3674] leading-none">$50,000.00</p>
              <p className="text-[14px] text-[#05CD99] font-bold mt-0.5">↑ 40%</p>
            </div>
          </div>
          <div className="">
            <Line data={revenueChartData} options={revenueChartOptions} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className='grid grid-cols-2 gap-3 mb-2.5'>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <h3 className="text-[12px] font-bold text-[#2B3674] mb-2.5">Client Payment Status</h3>
              <div className="flex flex-wrap gap-1.5 text-[9px] mb-3">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#05CD99]"></div>
                  <span className="text-[#A3AED0] font-medium">Paid 1000</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4318FF]"></div>
                  <span className="text-[#A3AED0] font-medium">Pending 330</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]"></div>
                  <span className="text-[#A3AED0] font-medium">Overdue 100</span>
                </div>
              </div>
              <div className="h-[400px]">
                <Bar data={paymentStatusData} options={barChartOptions} />
              </div>
            </div>

            {/* Countries Status */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[18px] font-bold text-[#1F2937]">Countries Status</h3>
                <select className="text-[14px] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-[#374151] font-medium focus:outline-none cursor-pointer">
                  <option>Yearly</option>
                </select>
              </div>
              {/* World Map */}
              <div className="mb-5 relative">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    scale: 100,
                    center: [0, 30]
                  }}
                  style={{ width: '100%', height: '150px' }}
                >
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const highlightedCountries = ['USA', 'FRA', 'DEU', 'JPN', 'United States of America', 'France', 'Germany', 'Japan'];
                        const isHighlighted = highlightedCountries.includes(geo.properties.ISO_A3) || highlightedCountries.includes(geo.properties.name);
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={isHighlighted ? '#4A90FF' : '#E5E7EB'}
                            stroke="#FFFFFF"
                            strokeWidth={0.5}
                            style={{
                              default: { outline: 'none' },
                              hover: { outline: 'none', fill: isHighlighted ? '#3B82F6' : '#D1D5DB' },
                              pressed: { outline: 'none' }
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ComposableMap>
              </div>
              {/* Countries List */}
              <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
                {countries.map((country, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {/* Flag Circle */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
                      {country.name === 'USA' && (
                        <svg viewBox="0 0 40 40" className="w-full h-full">
                          <rect fill="#FFFFFF" width="40" height="40"/>
                          <rect fill="#B22234" y="0" width="40" height="3"/>
                          <rect fill="#B22234" y="6" width="40" height="3"/>
                          <rect fill="#B22234" y="12" width="40" height="3"/>
                          <rect fill="#B22234" y="18" width="40" height="3"/>
                          <rect fill="#B22234" y="24" width="40" height="3"/>
                          <rect fill="#B22234" y="30" width="40" height="3"/>
                          <rect fill="#B22234" y="36" width="40" height="4"/>
                          <rect fill="#3C3B6E" width="18" height="20"/>
                          <g fill="#FFFFFF">
                            <circle cx="3" cy="3" r="1"/><circle cx="9" cy="3" r="1"/><circle cx="15" cy="3" r="1"/>
                            <circle cx="6" cy="6" r="1"/><circle cx="12" cy="6" r="1"/>
                            <circle cx="3" cy="9" r="1"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/>
                            <circle cx="6" cy="12" r="1"/><circle cx="12" cy="12" r="1"/>
                            <circle cx="3" cy="15" r="1"/><circle cx="9" cy="15" r="1"/><circle cx="15" cy="15" r="1"/>
                          </g>
                        </svg>
                      )}
                      {country.name === 'Japan' && (
                        <svg viewBox="0 0 40 40" className="w-full h-full">
                          <rect fill="#FFFFFF" width="40" height="40"/>
                          <circle cx="20" cy="20" r="10" fill="#BC002D"/>
                        </svg>
                      )}
                      {country.name === 'France' && (
                        <svg viewBox="0 0 40 40" className="w-full h-full">
                          <rect fill="#002395" x="0" width="13.33" height="40"/>
                          <rect fill="#FFFFFF" x="13.33" width="13.34" height="40"/>
                          <rect fill="#ED2939" x="26.67" width="13.33" height="40"/>
                        </svg>
                      )}
                      {country.name === 'Germany' && (
                        <svg viewBox="0 0 40 40" className="w-full h-full">
                          <rect fill="#000000" y="0" width="40" height="13.33"/>
                          <rect fill="#DD0000" y="13.33" width="40" height="13.34"/>
                          <rect fill="#FFCC00" y="26.67" width="40" height="13.33"/>
                        </svg>
                      )}
                    </div>
                    {/* Country Info */}
                    <div className="flex-1">
                      <p className="text-[15px] font-semibold text-[#1F2937]">{country.name}</p>
                      <p className="text-[13px] text-[#6B7280]">{country.users}</p>
                    </div>
                    {/* Progress Bar */}
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-[#E5E7EB] rounded-full h-2">
                        <div className="h-2 rounded-full transition-all duration-300" style={{ width: `${country.progress}%`, backgroundColor: country.color }}></div>
                      </div>
                      <span className="text-[14px] font-semibold text-[#374151] w-10 text-right">{country.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-xl p-4 shadow-sm mb-2.5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[16px] font-bold text-[#1F2937]">Customer Overview</h3>
              <select className="text-[12px] border border-[#E5E7EB] rounded-lg px-2 py-1 text-[#374151] font-medium focus:outline-none cursor-pointer">
                <option>Monthly</option>
              </select>
            </div>
            <div className="flex">
              {/* Legend on the left */}
              <div className="flex flex-col justify-center gap-2 pr-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></div>
                  <span className="text-[13px] text-[#6B7280]">New: 1500</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
                  <span className="text-[13px] text-[#6B7280]">Expired: 500</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></div>
                  <span className="text-[13px] text-[#6B7280]">Active: 500</span>
                </div>
              </div>
              {/* Semi-circle chart on the right */}
              <div className="flex-1 relative">
                <div className="h-[100px] flex items-end justify-center">
                  <Doughnut data={customerOverviewData} options={customerOverviewOptions} />
                </div>
                <p className="text-[12px] text-[#4318FF] font-medium text-center mt-1">Customer Report</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm mb-2.5 h-full">
            <h3 className="text-[18px] font-bold text-[#1F2937] mb-4">Plans</h3>
            <div className="space-y-4">
              {plans.map((plan, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-[14px] text-[#6B7280] font-medium w-28">{plan.name}</span>
                  <div className="flex-1 bg-[#E5E7EB] rounded-full h-2">
                    <div className="h-2 rounded-full transition-all duration-300" style={{ width: `${plan.progress}%`, backgroundColor: plan.color }}></div>
                  </div>
                  <span className="text-[14px] text-[#6B7280] font-medium w-10 text-right">{plan.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-3 mb-2.5">
            <div className="bg-white rounded-xl p-5 shadow-sm h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[18px] h-full font-bold text-[#1F2937]">Sales Statistic</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-[24px] font-bold text-[#1F2937] leading-none">$27,200</p>
                    <span className="text-[12px] font-semibold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded">10% ▲</span>
                    <span className="text-[13px] text-[#6B7280]">+ $1500 Per Day</span>
                  </div>
                </div>
                <select className="text-[13px] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-[#374151] font-medium focus:outline-none cursor-pointer">
                  <option>Yearly</option>
                </select>
              </div>
              <div className="h-[200px]">
                <Line data={salesStatData} options={salesChartOptions} plugins={[verticalLinePlugin]} />
              </div>
            </div>

            <div className="bg-white h-full rounded-xl p-5 shadow-sm mb-2.5">
              <h3 className="text-[18px] font-bold text-[#1F2937] mb-2">Total Subscriber</h3>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-[28px] font-bold text-[#1F2937] leading-none">5,000</p>
                <span className="text-[12px] font-semibold text-[#F97316] bg-[#FEF3C7] px-2 py-0.5 rounded-full">10% ▼</span>
                <span className="text-[13px] text-[#6B7280]">- 20 Per Day</span>
              </div>
              <div className="h-[190px]">
                <Bar data={subscriberData} options={subscriberChartOptions} plugins={[barLabelPlugin]} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-xl p-5 shadow-sm h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[18px] font-bold text-[#1F2937]">Users Overview</h3>
              <select className="text-[13px] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-[#374151] font-medium focus:outline-none cursor-pointer">
                <option>Today</option>
              </select>
            </div>
            <div className="h-[160px] flex items-center justify-center mb-4">
              <Doughnut data={usersOverviewData} options={doughnutOptions} />
            </div>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#487FFF]"></div>
                <span className="text-[14px] text-[#6B7280]">New: 500</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#F97316]"></div>
                <span className="text-[14px] text-[#6B7280]">Subscribed: 300</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
