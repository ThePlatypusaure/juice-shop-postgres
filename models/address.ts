/*
 * Copyright (c) 2014-2025 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import {
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
  DataTypes,
  type Sequelize
} from 'sequelize'
/* jslint node: true */
class Address extends Model<
InferAttributes<Address>,
InferCreationAttributes<Address>
> {
  declare UserId: number
  declare id: CreationOptional<number>
  declare fullName: string
  declare mobileNum: number
  declare zipCode: string
  declare streetAddress: string
  declare city: string
  declare state: string | null
  declare country: string
}

const AddressModelInit = (sequelize: Sequelize) => {
  Address.init(
    {
      UserId: {
        type: DataTypes.INTEGER
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fullName: {
        type: DataTypes.STRING
      },
      mobileNum: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: true,
          len: [7, 10]    // as per old 1 000 000–9 999 999 999
        }
      },
      zipCode: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 8]
        }
      },
      streetAddress: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 160]
        }
      },
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING
    },
    {
      tableName: 'Addresses',
      sequelize
    }
  )
}

export { Address as AddressModel, AddressModelInit }
