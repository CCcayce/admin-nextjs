// pages/index.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 调用后端 API 进行登录验证
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      // 登录成功，跳转到表单页面
      router.push('/form');
    } else {
      // 显示错误信息
      setError(data.message);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100">
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white">
        <Box textAlign="center">
          <Heading>用户登陆</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>账号</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="输入账号"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>密码</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="输入密码"
              />
            </FormControl>
            {error && (
              <Text color="red.500" mt={4}>
                {error}
              </Text>
            )}
            <Button type="submit" colorScheme="teal" width="full" mt={4}>
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
