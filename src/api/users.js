const Users = [
  {
    type: 1,
    company: '法智达',
    id: '张三1',
  },
  {
    type: 0,
    company: '法智达',
    id: '李四2',
  },
  {
    type: 1,
    company: '法智达',
    id: '李四3',
  },
  {
    type: 1,
    company: '法智达',
    id: '李四4',
  },
  {
    type: 1,
    company: '法智达',
    id: '李四5',
  },
  {
    type: 1,
    company: '法智达',
    id: '李四6',
  },
  {
    type: 1,
    company: '法智达',
    id: '李四7',
  },
  {
    type: 1,
    company: '法智达',
    id: '李四8',
  },

  {
    type: 1,
    company: '法智达',
    id: '李四9',
  },
]

const getUsers = limit => {
  return limit ? Users.slice(0, limit) : Users;
}

export { Users, getUsers}
