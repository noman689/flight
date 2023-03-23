// import { useState } from 'react';
// import {
//   Form,
//   Input,
//   Button,
//   Select,
//   Card,
//   DatePicker,
//   Row,
//   Col,
//   Radio,
// } from 'antd';
// import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// import './PassengerDetailsForm.scss';
// const { Option } = Select;

// interface Passenger {
//   id: number;
//   name: string;
//   dob: Date;
//   email: string;
//   phone: string;
//   specialNeeds?: string;
// }

// interface PassengerFormProps {
//   numAdults: number;
//   numChildren: number;
//   onFinish: (passengers: Passenger[]) => void;
// }

// const PassengerDetailsForm = ({
//   numAdults,
//   numChildren,
//   onFinish,
// }: PassengerFormProps) => {
//   const [form] = Form.useForm();
//   const [title, setTitle] = useState('');
//   const [gender, setGender] = useState('');
//   const [passengers, setPassengers] = useState<Passenger[]>([]);
//   const handleTitleChange = (value) => {
//     if (['mrs', 'ms'].includes(value)) {
//       setGender('female');
//     } else {
//       setGender('male');
//     }
//     setTitle(value);
//   };

//   const handleGenderChange = (genderItem) => {
//     if (genderItem == 'female') {
//       setTitle('ms');
//     } else {
//       setTitle('mr');
//     }
//     setGender(genderItem);
//   };

//   const handleSubmit = () => {
//     form.validateFields().then((values) => {
//       const newPassengers = [...passengers];
//       for (let i = 1; i <= numAdults; i++) {
//         const passenger: Passenger = {
//           id: newPassengers.length + 1,
//           name: values[`adultName${i}`],
//           dob: values[`adultDOB${i}`].toDate(),
//           email: values[`adultEmail${i}`],
//           phone: values[`adultPhone${i}`],
//         };
//         newPassengers.push(passenger);
//       }
//       for (let i = 1; i <= numChildren; i++) {
//         const passenger: Passenger = {
//           id: newPassengers.length + 1,
//           name: values[`childName${i}`],
//           dob: values[`childDOB${i}`].toDate(),
//           email: values[`childEmail${i}`],
//           phone: values[`childPhone${i}`],
//           specialNeeds: values[`childSpecialNeeds${i}`],
//         };
//         newPassengers.push(passenger);
//       }
//       onFinish(newPassengers);
//     });
//   };

//   const handleAddPassenger = () => {
//     setPassengers([
//       ...passengers,
//       {
//         id: passengers.length + 1,
//         name: '',
//         dob: new Date(),
//         email: '',
//         phone: '',
//       },
//     ]);
//   };

//   const handleRemovePassenger = (id: number) => {
//     setPassengers(passengers.filter((passenger) => passenger.id !== id));
//   };

//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       onFinish={handleSubmit}
//       className="passenger-form"
//     >
//       {[...Array(numAdults)].map((_, i) => (
//         <Card key={i} title={`Adult ${i + 1}`}>
//           <Row>
//             <Col>
//               <h3>Title</h3>
//             </Col>
//           </Row>
//           <Row gutter={[16, 16]}>
//             <Col span={24}>
//               <div style={{ marginBottom: '15px' }}>
//                 <Radio.Group
//                   value={title}
//                   onChange={(e) => handleTitleChange(e.target.value)}
//                 >
//                   <Row className="radio-group">
//                     <div className="radio-box">
//                       <Radio value={'mr'}>Mr</Radio>
//                     </div>
//                     <div className="radio-box">
//                       <Radio value={'mrs'}>Mrs</Radio>
//                     </div>
//                     <div className="radio-box">
//                       <Radio value={'ms'}>Ms</Radio>
//                     </div>
//                     <div className="radio-box">
//                       <Radio value={'sheikh'}>Sheikh</Radio>
//                     </div>
//                     <div className="radio-box">
//                       <Radio value={'sheikha'}>Sheikha</Radio>
//                     </div>
//                   </Row>
//                 </Radio.Group>
//               </div>
//             </Col>
//           </Row>
//           <Row gutter={[16, 16]}>
//             <Col span={12}>
//               <Form.Item
//                 name={`adultName${i + 1}`}
//                 rules={[{ required: true, message: 'Please enter name' }]}
//               >
//                 <Input placeholder="First Name" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="lastName">
//                 <Input placeholder="Last Name" />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={[16, 16]}>
//             <Col span={12}>
//               <Form.Item
//                 name={`adultDOB${i + 1}`}
//                 rules={[
//                   { required: true, message: 'Please select date of birth' },
//                 ]}
//               >
//                 <DatePicker placeholder="Date Of Birth" format="MM/DD/YYYY" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="nationality">
//                 <Select placeholder="Nationality">
//                   <Select.Option value="usa">USA</Select.Option>
//                   <Select.Option value="uk">UK</Select.Option>
//                   <Select.Option value="france">France</Select.Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={[16, 16]}>
//             <Col span={12}>
//               <div>
//                 <Radio.Group
//                   value={gender}
//                   onChange={(e) => handleGenderChange(e.target.value)}
//                 >
//                   <Row className="radio-group">
//                     <div className="radio-box">
//                       <Radio value={'male'}>Male</Radio>
//                     </div>
//                     <div className="radio-box">
//                       <Radio value={'female'}>Female</Radio>
//                     </div>
//                   </Row>
//                 </Radio.Group>
//               </div>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <h3>Passport Details</h3>
//             </Col>
//           </Row>
//           <Row gutter={[16, 16]}>
//             <Col span={12}>
//               <Form.Item name="passportNumber">
//                 <Input placeholder="Passport Number" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="passportExpiryDate">
//                 <DatePicker placeholder="Passport Expiry Date" />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <h3>Travel Details</h3>
//             </Col>
//           </Row>
//           <Row gutter={[16, 16]}>
//             <Col span={12}>
//               <Form.Item name="documentType">
//                 <Select placeholder="Travel Documents Type">
//                   <Select.Option value="usa">USA</Select.Option>
//                   <Select.Option value="uk">UK</Select.Option>
//                   <Select.Option value="france">France</Select.Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="country">
//                 <Select placeholder="Country">
//                   <Select.Option value="usa">USA</Select.Option>
//                   <Select.Option value="uk">UK</Select.Option>
//                   <Select.Option value="france">France</Select.Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>
//         </Card>
//       ))}

//       {[...Array(numChildren)].map((_, i) => (
//         <Card key={i} title={`Child ${i + 1}`}>
//           <Row gutter={[16, 16]}>
//             <Col span={12}>
//               <Form.Item
//                 name={`childName${i + 1}`}
//                 rules={[{ required: true, message: 'Please enter name' }]}
//               >
//                 <Input placeholder="First Name" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="lastName">
//                 <Input placeholder="Last Name" />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={[16, 16]}>
//             <Col span={12}>
//               <Form.Item
//                 name={`ChildDOB${i + 1}`}
//                 rules={[
//                   { required: true, message: 'Please select date of birth' },
//                 ]}
//               >
//                 <DatePicker placeholder="Date Of Birth" format="MM/DD/YYYY" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="nationality">
//                 <Select placeholder="Nationality">
//                   <Select.Option value="usa">USA</Select.Option>
//                   <Select.Option value="uk">UK</Select.Option>
//                   <Select.Option value="france">France</Select.Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={[16, 16]}>
//             <Col span={12}>
//               <Form.Item name="title">
//                 <Radio.Group>
//                   <Row className="radio-group">
//                     <div className="radio-box">
//                       <Radio value={'male'}>Male</Radio>
//                     </div>
//                     <div className="radio-box">
//                       <Radio value={'female'}>Female</Radio>
//                     </div>
//                   </Row>
//                 </Radio.Group>
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <h3>Passport Details</h3>
//             </Col>
//           </Row>
//           <Row gutter={[16, 16]}>
//             <Col span={12}>
//               <Form.Item name="passportNumber">
//                 <Input placeholder="Passport Number" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="passportExpiryDate">
//                 <DatePicker placeholder="Passport Expiry Date" />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <h3>Travel Details</h3>
//             </Col>
//           </Row>
//           <Row gutter={[16, 16]}>
//             <Col span={12}>
//               <Form.Item name="documentType">
//                 <Select placeholder="Travel Documents Type">
//                   <Select.Option value="usa">USA</Select.Option>
//                   <Select.Option value="uk">UK</Select.Option>
//                   <Select.Option value="france">France</Select.Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="country">
//                 <Select placeholder="Country">
//                   <Select.Option value="usa">USA</Select.Option>
//                   <Select.Option value="uk">UK</Select.Option>
//                   <Select.Option value="france">France</Select.Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>
//         </Card>
//       ))}
//       {passengers.map((passenger) => (
//         <Card
//           key={passenger.id}
//           title={`Passenger ${passenger.id}`}
//           extra={
//             <DeleteOutlined
//               onClick={() => handleRemovePassenger(passenger.id)}
//             />
//           }
//         >
//           <Form.Item
//             name={`passengerName${passenger.id}`}
//             label="Name"
//             rules={[{ required: true, message: 'Please enter name' }]}
//             initialValue={passenger.name}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name={`passengerDOB${passenger.id}`}
//             label="Date of Birth"
//             rules={[{ required: true, message: 'Please select date of birth' }]}
//             initialValue={passenger.dob}
//           >
//             <DatePicker format="MM/DD/YYYY" />
//           </Form.Item>
//           <Form.Item
//             name={`passengerEmail${passenger.id}`}
//             label="Email"
//             rules={[{ required: true, message: 'Please enter email' }]}
//             initialValue={passenger.email}
//           >
//             <Input type="email" />
//           </Form.Item>
//           <Form.Item
//             name={`passengerPhone${passenger.id}`}
//             label="Phone"
//             rules={[{ required: true, message: 'Please enter phone' }]}
//             initialValue={passenger.phone}
//           >
//             <Input type="tel" />
//           </Form.Item>
//           <Form.Item
//             name={`passengerSpecialNeeds${passenger.id}`}
//             label="Special Needs"
//             initialValue={passenger.specialNeeds}
//           >
//             <Input />
//           </Form.Item>
//         </Card>
//       ))}
//       <Button
//         type="dashed"
//         onClick={handleAddPassenger}
//         block
//         icon={<PlusOutlined />}
//       >
//         Add Passenger
//       </Button>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default PassengerDetailsForm;
