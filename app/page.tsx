'use client';

import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import {
  Activity, BadgeCheck, BarChart3, Bell, BookOpen, BriefcaseBusiness, Building2,
  CalendarDays, Check, ChevronRight, CircleDollarSign, ClipboardCheck, Clock3,
  Cloud, Coins, FileCheck2, FileText, Flame, FolderKanban, Gem, Gift, GraduationCap, Headphones,
  HeartHandshake, Home, Landmark, LockKeyhole, Megaphone, MessageCircleMore,
  PackageSearch, PieChart, Search, Settings2, ShieldCheck, Sparkles, Star,
  Target, TrendingUp, UserRound, UserRoundPlus, UsersRound, WalletCards,
} from 'lucide-react';

type IconType = typeof Home;
type ScreenDef = { title:string; eyebrow:string; mode:'light'|'dark'; component:() => ReactNode };
type AppActions = { go:(target:number)=>void; notify:(message:string)=>void };
const AppContext = createContext<AppActions>({ go:()=>undefined, notify:()=>undefined });
const useApp = () => useContext(AppContext);

function Halo({ large=false, label='AI' }:{ large?:boolean; label?:string }) {
  return <span className={`halo ${large?'halo-large':'halo-small'}`}><span>{label}</span></span>;
}

function StatusBar() { return <div className="status-row"><span>9:41</span><span className="status-icons">●●●&nbsp; 5G&nbsp; ▰</span></div>; }

function Avatar({ children, dark=false }:{ children:ReactNode; dark?:boolean }) {
  return <span className={`avatar ${dark?'avatar-ai':''}`}>{children}</span>;
}

function Topbar({ title, subtitle, initial='施', dark=false, simple=false }:{ title:string; subtitle?:string; initial?:string; dark?:boolean; simple?:boolean }) {
  if(simple) return <header className="topbar simple-top"><b>{title}</b><span className="top-actions"><Search size={18}/></span></header>;
  return <header className="topbar"><div className="user-line"><Avatar dark={dark}>{initial}</Avatar><div><b>{title}</b>{subtitle&&<small>{subtitle}</small>}</div></div><span className="top-actions"><Search size={17}/><Bell size={17}/></span></header>;
}

function SectionTitle({ children, more }:{ children:ReactNode; more?:string }) {
  return <div className="section-title"><b>{children}</b>{more&&<span>{more} <ChevronRight size={12}/></span>}</div>;
}

function Tag({ children, tone='purple' }:{ children:ReactNode; tone?:'purple'|'gray'|'red'|'green'|'gold' }) {
  return <span className={`tag tag-${tone}`}>{children}</span>;
}

function GridMenu({ items, columns=4, routes={} }:{ items:[IconType,string][]; columns?:number; routes?:Record<string,number> }) {
  const { go, notify } = useApp();
  return <div className="grid-menu" style={{gridTemplateColumns:`repeat(${columns},1fr)`}}>{items.map(([Icon,label])=><button className="grid-option" onClick={()=>routes[label]!==undefined?go(routes[label]):notify(`${label}：演示入口已响应`)} key={label}><span className="grid-icon"><Icon size={19}/></span><small>{label}</small></button>)}</div>;
}

function Suggestion({ children, action, compact=false }:{ children:ReactNode; action?:string; compact?:boolean }) {
  const { notify } = useApp();
  return <div className={`suggestion ${compact?'compact':''}`}><Halo/><div className="suggestion-copy">{children}{action&&<button onClick={()=>notify(`${action}：已进入演示流程`)}>{action}</button>}</div></div>;
}

function BottomNav({ items, active=0, dark=false, routes={} }:{ items:[IconType,string][]; active?:number; dark?:boolean; routes?:Record<string,number> }) {
  const { go, notify } = useApp();
  return <footer className={`bottom-nav ${dark?'bottom-dark':''}`}>{items.map(([Icon,label],i)=><button className={i===active?'active':''} onClick={()=>routes[label]!==undefined?go(routes[label]):notify(`${label}：演示入口已响应`)} key={label}><Icon size={18}/><small>{label}</small></button>)}</footer>;
}

function Phone({ children, dark=false, nav }:{ children:ReactNode; dark?:boolean; nav?:ReactNode }) {
  return <div className={`phone-frame ${dark?'dark-screen':'light-screen'}`}><div className="island"/><StatusBar/><div className={`phone-scroll ${nav?'with-nav':''}`}>{children}</div>{nav}</div>;
}

const companyNav:[IconType,string][]=[[Home,'首頁'],[FolderKanban,'平台'],[TrendingUp,'業務'],[Sparkles,'AI助手'],[UserRound,'我的']];
const advisorNav:[IconType,string][]=[[Home,'首頁'],[GraduationCap,'學院'],[TrendingUp,'業務'],[UsersRound,'社群'],[UserRound,'我的']];
const aiNav:[IconType,string][]=[[Home,'首頁'],[MessageCircleMore,'AI陪伴'],[FolderKanban,'工作台'],[PackageSearch,'AI商城'],[UserRound,'我的']];

function IdentityScreen() {
  const { go } = useApp();
  const roles:[IconType,string,string][]=[
    [Building2,'公司管理入口','管理層、行政、人事、財務、合規與運營'],
    [BriefcaseBusiness,'家辦顧問入口','IFA、保險顧問、家辦顧問與合作伙伴'],
    [Gem,'個人 / 客戶入口','高淨值客戶、企業主、家庭用戶與準會員'],
  ];
  return <Phone dark><div className="identity-page"><div className="identity-hero"><Halo large label="AA"/><p className="kicker">FAMILY OFFICE · AI COPILOT</p><h2>AA AI 家辦系統</h2><p>為公司、團隊、顧問與客戶打造的<br/>一站式 AI 工作平台</p></div><div className="role-stack">{roles.map(([Icon,title,desc],index)=><button className="role-card" onClick={()=>go(index===0?1:index===1?2:7)} key={title}><span className="role-icon"><Icon size={22}/></span><div><h3>{title}</h3><p>{desc}</p></div><ChevronRight size={17}/></button>)}</div><div className="remember"><span/>下次自動記住我的身份</div></div></Phone>;
}

function CompanyHome() {
  const { go } = useApp();
  const manage:[IconType,string][]=[[UsersRound,'我的圈子'],[CalendarDays,'我的日程'],[WalletCards,'我的財務'],[BarChart3,'數據中心']];
  const internal:[IconType,string][]=[[FileText,'合約管理'],[BookOpen,'公司制度'],[Clock3,'考勤管理'],[TrendingUp,'業務進度'],[HeartHandshake,'IFA 合約'],[BadgeCheck,'業務評估'],[CircleDollarSign,'分傭機制'],[Landmark,'保司渠道']];
  return <Phone nav={<BottomNav items={companyNav} routes={{首頁:1,平台:4,業務:2,AI助手:3,我的:7}}/>}><Topbar title="施麗麗" subtitle="卓越團隊始創人 · 管理層"/><SectionTitle>今日總覽</SectionTitle><div className="data-grid"><Data num="6" label="待審合約"/><Data num="3" label="待批費用"/><Data num="4" label="待入職 IFA"/><Data num="68%" label="業務完成率"/></div><div className="hero-banner"><Tag tone="gray">系統公告</Tag><h2>AA AI 家辦系統正式啟動</h2><p>讓每一位顧問都有自己的 AI 陪跑教練</p><i/></div><SectionTitle>AI 今日建議</SectionTitle><Suggestion compact>本週有 <b>3 份 IFA 合約</b>即將到期，建議優先安排續約審批。</Suggestion><SectionTitle more="更多">我的管理</SectionTitle><GridMenu items={manage} routes={{我的日程:7,我的財務:7}}/><SectionTitle>內部管理系統</SectionTitle><GridMenu items={internal} routes={{合約管理:4,'IFA 合約':4,公司制度:4,考勤管理:4,分傭機制:4,保司渠道:4}}/><button className="ai-float" onClick={()=>go(3)}><Sparkles size={18}/> AI</button></Phone>;
}

function Data({num,label,tone}:{num:string;label:string;tone?:'red'}) { return <div className="data-pill"><b className={tone==='red'?'red':''}>{num}</b><small>{label}</small></div>; }

function ProgressRing({value,label='完成率'}:{value:number;label?:string}) { return <div className="progress-ring" style={{background:`conic-gradient(var(--violet) ${value}%, #ececf2 0)`}}><div><b>{value}%</b><small>{label}</small></div></div>; }

function AdvisorHome() {
  const { go } = useApp();
  const tools:[IconType,string][]=[[PackageSearch,'產品資料'],[PieChart,'產品對比'],[CircleDollarSign,'保費試算'],[Activity,'客戶診斷'],[Megaphone,'營銷工具'],[GraduationCap,'培訓學院'],[FileCheck2,'計劃書'],[Sparkles,'AI成交陪跑']];
  return <Phone nav={<BottomNav items={advisorNav} routes={{首頁:2,學院:6,業務:1,社群:5,我的:7}}/>}><Topbar title="陳小姐　·　鑽石顧問" subtitle="卓越團隊 · 家辦顧問" initial="陳"/><div className="kpi-card"><ProgressRing value={64}/><div className="kpi-copy"><small>本月業務目標</small><h2>HKD 3,200,000</h2><p>/ 5,000,000</p><div className="progress"><i style={{width:'64%'}}/></div><div className="mini-metrics"><span>新客戶 <b>48</b></span><span>有效面談 <b>31</b></span><span>成交 <b>7</b></span></div></div></div><SectionTitle more="全部">今日任務</SectionTitle><Suggestion compact><b>AI 建議：</b>優先跟進 5 位高意向客戶，其中 2 位計劃書已逾 3 天未回覆。</Suggestion><div className="list-card"><List icon={Headphones} title="跟進客戶 · 黃先生" sub="教育金規劃 · 二次面談" tag="進行中"/><List icon={FileCheck2} title="遞交計劃書 · 李太太" sub="高端醫療 + 儲蓄型組合" tag="待處理" gray/><List icon={CalendarDays} title="家辦財富傳承閉門會" sub="10月18日 · 中環 · 已報名 22/30" tag="已確認" green/></div><SectionTitle>快捷工具</SectionTitle><GridMenu items={tools} routes={{營銷工具:9,培訓學院:6,AI成交陪跑:3}}/><button className="ai-float" onClick={()=>go(3)}><Sparkles size={18}/> AI</button></Phone>;
}

function List({icon:Icon,title,sub,tag,gray=false,green=false,red=false}:{icon:IconType;title:string;sub:string;tag?:string;gray?:boolean;green?:boolean;red?:boolean}) { return <div className="list-row"><span className="list-icon"><Icon size={17}/></span><div><b>{title}</b><small>{sub}</small></div>{tag&&<Tag tone={green?'green':red?'red':gray?'gray':'purple'}>{tag}</Tag>}</div>; }

function AICompanion() {
  const { notify } = useApp();
  const tools:[IconType,string][]=[[Activity,'AI客戶診斷'],[PackageSearch,'AI產品建議'],[MessageCircleMore,'AI話術教練'],[Target,'AI招募陪跑'],[CalendarDays,'AI活動策劃'],[TrendingUp,'AI成交復盤'],[FileText,'AI合約問答'],[BarChart3,'AI週報生成']];
  return <Phone dark nav={<BottomNav items={aiNav} active={1} dark routes={{首頁:2,AI陪伴:3,工作台:1,AI商城:6,我的:7}}/>}><Topbar dark title="早上好，陳小姐" subtitle="今天是你的 AI 家辦陪跑日" initial="陳"/><div className="ai-hero"><Halo large label="AI"/><h2>你的今日陪跑計劃已就緒</h2><p>已綜合客戶、招募、活動與合約進度</p></div><SectionTitle>AI 今日建議</SectionTitle><Suggestion action="立即跟進">今日應跟進 <b>8 位客戶</b>，其中 2 位計劃書已超過 3 天未回覆</Suggestion><Suggestion action="安排面談"><b>3 個招募候選人</b>需要二次面談，建議本週內完成</Suggestion><Suggestion action="生成文案">本週活動報名率 <b>68%</b>，建議發布 2 條內容催谷報名</Suggestion><SectionTitle>AI 工具</SectionTitle><GridMenu items={tools}/><button className="primary-ai" onClick={()=>notify('今日 AI 陪跑流程已启动')}><Sparkles size={17}/>開始今日 AI 陪跑</button></Phone>;
}

function InternalManagement() {
  return <Phone nav={<BottomNav items={companyNav} active={1} routes={{首頁:1,平台:4,業務:2,AI助手:3,我的:7}}/>}><Topbar simple title="內部管理系統"/><div className="tabs"><b>合約管理</b><span>公司制度</span><span>考勤管理</span><span>分傭機制</span><span>審批中心</span></div><div className="data-grid cols-3"><Data num="128" label="生效中"/><Data num="6" label="待審批" tone="red"/><Data num="3" label="即將到期" tone="red"/></div><div className="list-head"><SectionTitle>合約列表</SectionTitle><span className="filter-chip">全部合約⌄</span></div><div className="list-card"><List icon={FileText} title="IFA 合作協議 · 黃志明" sub="生效日 2024-11-02 · 3年期" tag="7天後到期" red/><List icon={FileText} title="保司渠道協議 · 友邦" sub="部門：保司渠道 · 續約審核中" tag="待審" gray/><List icon={FileText} title="服務協議 · 家辦顧問團隊 B" sub="生效日 2025-01-15" tag="生效中" green/><List icon={FileText} title="費用報銷合約 · Q3" sub="財務部提交 · 待管理層審批" tag="待審" gray/><List icon={FileText} title="IFA 合作協議 · 李嘉欣" sub="生效日 2023-06-20 · 已續約" tag="生效中" green/></div><SectionTitle>AI 提醒</SectionTitle><Suggestion compact>本週共 <b>3 份合約</b>將到期，建議提前 14 天發起續約通知。</Suggestion></Phone>;
}

function Recruitment() {
  const perks:[IconType,string][]=[[Landmark,'高端家辦平台'],[Sparkles,'AI 陪跑賦能'],[GraduationCap,'系統化培訓']];
  return <Phone nav={<BottomNav items={companyNav} active={1} routes={{首頁:1,平台:4,業務:2,AI助手:3,我的:7}}/>}><Topbar simple title="人才招募系統"/><div className="recruit-hero"><p>JOIN THE FUTURE</p><h2>成為家辦顧問</h2><span>不只是保險代理，而是家庭財富顧問</span><div><button>立即了解</button><button>預約面談</button></div><Target size={82}/></div><SectionTitle>你的成長優勢</SectionTitle><GridMenu items={perks} columns={3}/><SectionTitle>本月招募漏斗</SectionTitle><div className="funnel-card"><div className="funnel-numbers"><span><b>62</b>接觸</span><span><b>43</b>面談</span><span><b>24</b>複試</span><span><b>9</b>入職</span></div><div className="funnel"><i/><i/><i/><i/></div></div><SectionTitle more="全部候選人">候選人跟進</SectionTitle><div className="list-card"><Person initial="王" title="王先生" sub="二次面談 · 前銀行客戶經理" tag="跟進中"/><Person initial="周" title="周小姐" sub="初次接觸 · 轉介紹" tag="待邀約" gray/><Person initial="林" title="林先生" sub="已通過複試 · 等待文件" tag="待入職" green/></div><Suggestion compact><b>AI 招募文案：</b>已為「新人啟航計劃」生成 3 條朋友圈素材。</Suggestion></Phone>;
}

function Person({initial,title,sub,tag,gray=false,green=false}:{initial:string;title:string;sub:string;tag:string;gray?:boolean;green?:boolean}) { return <div className="list-row"><Avatar>{initial}</Avatar><div><b>{title}</b><small>{sub}</small></div><Tag tone={green?'green':gray?'gray':'purple'}>{tag}</Tag></div>; }

function Academy() {
  return <Phone nav={<BottomNav items={advisorNav} active={1} routes={{首頁:2,學院:6,業務:1,社群:5,我的:7}}/>}><Topbar simple title="培訓商學院"/><div className="tabs"><b>新人啟航</b><span>產品課程</span><span>家辦課程</span><span>成交訓練</span><span>合規課程</span></div><div className="learning-card"><ProgressRing value={42} label="學分"/><div><small>本季學習進度</small><h2>5 / 12 門必修課</h2><p>排名前 18% · 還差 18 學分升級</p></div></div><SectionTitle more="查看全部">為你推薦</SectionTitle><Course icon={Activity} title="高淨值客戶需求分析" sub="家辦基礎 · 共 8 課時 · 陳老師" pct={55} tag="繼續學習"/><Course icon={ShieldCheck} title="萬用壽險產品精講" sub="保險產品 · 共 6 課時 · 李老師" pct={0} tag="未開始" gray/><Course icon={GraduationCap} title="新人啟航：行業認知與流程" sub="新人啟航 · 共 4 課時" pct={100} tag="已完成" green/><SectionTitle>AI 學習教練</SectionTitle><Suggestion compact>根據你的業務方向，建議本週優先完成「高淨值客戶需求分析」第 5—6 課時。</Suggestion></Phone>;
}

function Course({icon:Icon,title,sub,pct,tag,gray=false,green=false}:{icon:IconType;title:string;sub:string;pct:number;tag:string;gray?:boolean;green?:boolean}) { return <div className="course-card"><span className="course-cover"><Icon size={25}/><i>AA ACADEMY</i></span><div className="course-copy"><div><b>{title}</b><small>{sub}</small></div><Tag tone={green?'green':gray?'gray':'purple'}>{tag}</Tag><div className="progress"><i style={{width:`${pct}%`}}/></div></div></div>; }

function MemberCenter() {
  const { go } = useApp();
  const manage:[IconType,string][]=[[CalendarDays,'我的日程'],[WalletCards,'我的財務'],[FileText,'我的合約'],[ClipboardCheck,'我的審批'],[GraduationCap,'我的學習'],[UsersRound,'我的客戶'],[Star,'我的收藏'],[Flame,'每日打卡']];
  return <Phone dark nav={<BottomNav items={advisorNav} active={4} dark routes={{首頁:2,學院:6,業務:1,社群:5,我的:7}}/>}><div className="member-top"><b>我的</b><Settings2 size={18}/></div><div className="vip-card"><div className="vip-head"><div><b>陳小姐</b><small>NO. AA0000728</small></div><Tag tone="gold">DIAMOND VIP</Tag></div><h2>家辦 AI 陪跑權限已開通</h2><p>有效期至 2026-09-20</p><div className="vip-actions"><button>立即升級</button><button>會員權益</button></div><Gem size={104}/></div><SectionTitle>我的管理</SectionTitle><GridMenu items={manage} routes={{我的學習:6,我的合約:4,每日打卡:8}}/><SectionTitle>AI 陪跑</SectionTitle><button className="dark-link" onClick={()=>go(3)}><Halo/><div><b>進入 AI 陪跑首頁</b><small>今日已為你生成 4 條建議</small></div><ChevronRight size={16}/></button><SectionTitle>系統設置</SectionTitle><div className="dark-list"><DarkRow icon={LockKeyhole} label="權限與角色"/><DarkRow icon={Bell} label="通知設定"/><DarkRow icon={Cloud} label="語言與地區"/><DarkRow icon={Headphones} label="聯絡客服"/></div></Phone>;
}

function DailyCheckIn() {
  const { notify } = useApp();
  const [checked,setChecked] = useState(false);
  const checkedDays = new Set([2,5,8,10,14,17,19,21,24,25,26,27,28,29]);
  const checkIn = () => {
    if (checked) return notify('今天已经打卡，明天再来');
    setChecked(true);
    notify('打卡成功，积分 +10');
  };
  return <Phone nav={<BottomNav items={advisorNav} active={4} routes={{首頁:2,學院:6,業務:1,社群:5,我的:7}}/>}><Topbar simple title="每日打卡積分"/><div className="checkin-hero"><div className="points-balance"><span><Coins size={15}/>可用積分</span><b>{checked?'1,290':'1,280'}</b><small>本月已獲得 {checked?'190':'180'} 積分</small></div><div className="streak"><Flame size={22}/><b>{checked?'8':'7'} 天</b><small>連續打卡</small></div><button className={checked?'done':''} onClick={checkIn}>{checked?<><Check size={15}/>今日已打卡</>:<><CalendarDays size={15}/>立即打卡 +10</>}</button></div><div className="calendar-card"><div className="calendar-head"><div><b>2026 年 8 月</b><small>已打卡 {checked?'15':'14'} 天</small></div><Tag tone="purple">滿勤再送 100</Tag></div><div className="week-row">{['日','一','二','三','四','五','六'].map(day=><span key={day}>{day}</span>)}</div><div className="calendar-grid">{Array.from({length:31},(_,i)=>i+1).map(day=><span className={`${checkedDays.has(day)?'checked':''} ${day===30?'today':''} ${day===30&&checked?'checked':''}`} key={day}>{checkedDays.has(day)||(day===30&&checked)?<Check size={10}/>:day}</span>)}</div></div><SectionTitle more="積分規則">今日積分任務</SectionTitle><div className="points-tasks"><PointsTask icon={Check} title="每日登入打卡" sub="每天完成 1 次" points="+10" done={checked}/><PointsTask icon={BookOpen} title="完成一節課程" sub="商學院學習滿 15 分鐘" points="+20"/><PointsTask icon={UserRoundPlus} title="跟進一位客戶" sub="更新客戶跟進記錄" points="+15"/><PointsTask icon={Sparkles} title="使用 AI 陪跑" sub="完成一項 AI 建議任務" points="+10"/></div><SectionTitle more="全部禮遇">積分兌換</SectionTitle><div className="reward-grid"><button onClick={()=>notify('需要 2,000 积分兑换')}><span><Gift size={18}/></span><b>課程兌換券</b><small>2,000 積分</small></button><button onClick={()=>notify('需要 3,500 积分兑换')}><span><Gem size={18}/></span><b>VIP 活動席位</b><small>3,500 積分</small></button></div></Phone>;
}

function PointsTask({icon:Icon,title,sub,points,done=false}:{icon:IconType;title:string;sub:string;points:string;done?:boolean}) {
  const { notify } = useApp();
  return <div className="points-task"><span><Icon size={16}/></span><div><b>{title}</b><small>{sub}</small></div><button className={done?'done':''} onClick={()=>notify(done?'任务已完成':`${title}：进入任务`)}>{done?'已完成':points}</button></div>;
}

function AIAdCarousel() {
  const { go } = useApp();
  const [slide,setSlide] = useState(0);
  const touchStart = useRef<number|null>(null);
  const ads = [
    { image:'/ads/xiao-a-family-office.jpg', kicker:'AA AI FAMILY OFFICE', title:'小A家辦', copy:'讓每一位保險顧問，都擁有頂級家辦的專業能力' },
    { image:'/ads/ai-insight.png', kicker:'AI CLIENT INSIGHT', title:'AI 客戶洞察', copy:'從家庭目標出發，快速整理需求與下一步跟進方向' },
    { image:'/ads/family-legacy.png', kicker:'FAMILY LEGACY', title:'讓專業陪伴每一代', copy:'把保障、財富與傳承，放進同一張家庭藍圖' },
  ];
  const move = (direction:number) => setSlide(current=>(current+direction+ads.length)%ads.length);
  const finishSwipe = (x:number) => {
    if(touchStart.current===null)return;
    const delta=x-touchStart.current;
    if(Math.abs(delta)>38)move(delta<0?1:-1);
    touchStart.current=null;
  };
  const ad=ads[slide];
  return <Phone dark><div className="ad-world">
    <div className="ad-world-head"><span><Sparkles size={13}/> AA AI 廣告世界</span><button onClick={()=>go(2)}>返回工作台</button></div>
    <div className="ad-intro"><p>SWIPE TO DISCOVER</p><h1>遇見你的 AI 家辦搭檔</h1><small>左右滑動，一張一張探索</small></div>
    <div className="ad-deck" onTouchStart={event=>touchStart.current=event.touches[0].clientX} onTouchEnd={event=>finishSwipe(event.changedTouches[0].clientX)}>
      <i className="ad-card-shadow shadow-one"/><i className="ad-card-shadow shadow-two"/>
      <article className="ad-card" key={ad.image} style={{backgroundImage:`url(${ad.image})`}}>
        <div className="ad-card-shade"/>
        <div className="ad-card-copy"><span>{ad.kicker}</span><h2>{ad.title}</h2><p>{ad.copy}</p></div>
        <button className="ad-card-cta" onClick={()=>go(3)}>AI 生成同款 <ChevronRight size={14}/></button>
      </article>
      <button aria-label="上一張" className="ad-arrow ad-arrow-left" onClick={()=>move(-1)}>‹</button>
      <button aria-label="下一張" className="ad-arrow ad-arrow-right" onClick={()=>move(1)}>›</button>
    </div>
    <div className="ad-dots">{ads.map((item,index)=><button aria-label={`第 ${index+1} 張`} className={index===slide?'active':''} onClick={()=>setSlide(index)} key={item.image}/>)}</div>
    <button className="enter-system" onClick={()=>go(2)}><span><Sparkles size={15}/>返回顧問工作台</span><ChevronRight size={16}/></button>
  </div></Phone>;
}

function DarkRow({icon:Icon,label}:{icon:IconType;label:string}) { return <div><span><Icon size={16}/></span><b>{label}</b><ChevronRight size={15}/></div>; }

const screens:ScreenDef[]=[
  { title:'身份選擇', eyebrow:'ENTRY EXPERIENCE', mode:'dark', component:IdentityScreen },
  { title:'公司管理首頁', eyebrow:'MANAGEMENT DASHBOARD', mode:'light', component:CompanyHome },
  { title:'顧問工作台', eyebrow:'ADVISOR WORKSPACE', mode:'light', component:AdvisorHome },
  { title:'AI 陪跑', eyebrow:'SIGNATURE EXPERIENCE', mode:'dark', component:AICompanion },
  { title:'內部管理', eyebrow:'OPERATIONS CENTER', mode:'light', component:InternalManagement },
  { title:'人才招募', eyebrow:'RECRUITMENT PIPELINE', mode:'light', component:Recruitment },
  { title:'培訓商學院', eyebrow:'AA ACADEMY', mode:'light', component:Academy },
  { title:'會員中心', eyebrow:'MEMBER EXPERIENCE', mode:'dark', component:MemberCenter },
  { title:'每日打卡積分', eyebrow:'DAILY REWARDS', mode:'light', component:DailyCheckIn },
  { title:'AI 廣告世界', eyebrow:'OPENING CAMPAIGN', mode:'dark', component:AIAdCarousel },
];

export default function HomePage(){
  const [active,setActive]=useState(0);
  const [history,setHistory]=useState<number[]>([]);
  const [toast,setToast]=useState('');
  const toastTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const Screen=screens[active].component;
  const go=(target:number)=>{if(target===active)return;setHistory(items=>[...items,active]);setActive(target);};
  const back=()=>setHistory(items=>{if(!items.length){setActive(0);return items;}const next=[...items];setActive(next.pop()??0);return next;});
  const notify=(message:string)=>{setToast(message);if(toastTimer.current)clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setToast(''),1800);};
  const isEntry=active===0||active===9;
  return <AppContext.Provider value={{go,notify}}><main className={`prototype-app ${active===9?'ad-opening':''}`}><div className="prototype-brand"><span className="brand-mark"><Sparkles size={17}/></span><div><b>AA AI 家辦超級工作台</b><small>可點擊演示原型 · 所有資料均為示例</small></div></div><section className="prototype-stage"><div className={`prototype-controls ${isEntry?'entry':''}`}>{!isEntry&&<button onClick={back}>‹ 返回</button>}{!isEntry&&<button onClick={()=>{setHistory([]);setActive(0)}}>切換身份</button>}</div><Screen/>{toast&&<div className="prototype-toast"><Check size={14}/>{toast}</div>}</section><p className="prototype-tip">左右滑動廣告卡片，或進入系統點擊各個功能體驗流程</p></main></AppContext.Provider>;
}
