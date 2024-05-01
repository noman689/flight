import {
  Form,
  Input,
  Row,
  Col,
} from 'antd';
import './Login.scss';

const Login = () => {
  const [form] = Form.useForm();

  const[]

    const onFinish=(values)=>{

    }

  return (
    <div className="flight-search-form">
      <div className="paddingLR">
        <Form onFinish={onFinish} form={form}>
          <Row
            justify={'center'}
            style={{ alignItems: 'baseline', display: 'flex', width: '100%' }}
            className="autoCompleteHeight"
          >
              <Form.Item
                name="origin"
                rules={[
                  {
                    required: true,
                    message: 'Search Departure city',
                  },
                ]}
              >
                <Input
                  value={auth.email}
                  onChange={(value) => setAuth((prev)=>{
                    ...prev,
                    email:value
                  })}
                />
              </Form.Item>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default FlightSearchForm;
