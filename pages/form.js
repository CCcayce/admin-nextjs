import { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Spinner, Center, Input, Button, HStack } from '@chakra-ui/react';

export default function FormPage () {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date()
  today.setHours(0, 0, 0, 0);
  const [startDate, setStartDate] = useState(today);
  const monday = new Date()
  monday.setDate(today.getDate() + 1);
  monday.setHours(0, 0, 0, 0);
  const [endDate, setEndDate] = useState(monday);
  const [page, setPage] = useState(1); // 当前页码
  const [perPage, setPerPage] = useState(10); // 每页显示条数

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, page, perPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const startDatetimesp = new Date(startDate).getTime();
      const endDatetimesp = new Date(endDate).getTime();
      const res = await fetch(`/api/form?startDate=${startDatetimesp}&endDate=${endDatetimesp}&page=${page}&perPage=${perPage}`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      setFormData(data); // 假设后端直接返回数据对象，不带 `success` 属性
    } catch (error) {
      console.error('Error fetching data:', error);
      // 处理错误状态
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    setPage(1); // 筛选条件变化时，回到第一页重新加载数据
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setPage(1);
  };

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={8}>
      <Box mb={4} display="flex" alignItems="left">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          mr={2}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          mr={2}
        />
        {/* <Button colorScheme="teal" onClick={handleFilter} mr={2}>Filter</Button>
        <Button onClick={handleReset}>Reset</Button> */}
      </Box>
      <Heading mb={6}>数据展示</Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Phone</Th>
            <Th>Age</Th>
            <Th>Address</Th>
            <Th>Hostname</Th>
            <Th>Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {formData.map((field) => (
            <Tr key={field.id}>
              <Td>{field.id}</Td>
              <Td>{field.name}</Td>
              <Td>{field.phone}</Td>
              <Td>{field.age}</Td>
              <Td>{field.address}</Td>
              <Td>{field.hostname}</Td>
              <Td>{new Date(field.time).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* 分页控件 */}
      <Box display="flex" alignItems="center"  mt={4} spacing={4}>
        <Button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>上一页</Button>
        <Button onClick={() => setPage(prevPage => prevPage + 1)}>下一页</Button>
      </Box>
    </Box>
  );
}
