const Sensors = [
  {
    type: 'A1000',
    project: '21',
    id: 'FZDA20082001',
  },
  {
    type: 'A1000',
    project: '22',
    id: 'FZDA20082002',
  },
  {
    type: 'A1000',
    project: '23',
    id: 'FZDA20082003',
  },
  {
    type: 'A1000',
    project: '24',
    id: 'FZDA20082004',
  },
  {
    type: 'A1000',
    project: '25',
    id: 'FZDA20082005',
  },
  {
    type: 'A1000',
    project: '26',
    id: 'FZDA20082006',
  },
  {
    type: 'A1000',
    project: '27',
    id: 'FZDA20082007',
  },
  {
    type: 'A1000',
    project: '280',
    id: 'FZDA20082008',
  },

  {
    type: 'A1000',
    project: '290',
    id: 'FZDA20082009',
  },
]

const getSensors = limit => {
  return limit ? Sensors.slice(0, limit) : Sensors;
}

export { Sensors, getSensors }
