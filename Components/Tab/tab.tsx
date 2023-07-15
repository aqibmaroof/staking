import { Tabs, Tab } from "react-bootstrap";
import "./tab.module.scss";

interface ITabOptions {
  key: string;
  title: string;
  chain?: number;
  rpcUrl?: string;
  tabFor?: string;
}
interface IProps {
  activeKey: string;
  tabOptions: ITabOptions[];
  tabFor?: string;
  onChangeTab: (selectedTab: string) => void;
}

function TabComponent(props: IProps) {
  const onTabSelect = (k: string | null) => {
    if (k) props.onChangeTab(k);
  };

  return (
    <Tabs
      defaultActiveKey={props.activeKey}
      id="uncontrolled-tab-example"
      onSelect={(k) => onTabSelect(k)}
      activeKey={props.activeKey}
      className={`${props.tabFor === "cycle" && "adjustTab"} tabber-container`}
    >
      {props.tabOptions.map((option: ITabOptions) => {
        return (
          <Tab
            key={option.key}
            eventKey={option.key}
            title={option.title}
            tabClassName="heading-5"
          ></Tab>
        );
      })}
    </Tabs>
  );
}

export default TabComponent;
