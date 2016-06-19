require 'csv'

class Seed
  def self.enterData
    branches = CSV.read('bank_branches.csv')
    count = 0;
    branches.each do |branchArr|
      objBranch = Branch.new
      objBranch.ifsc = branchArr[0];
      objBranch.bank_id = branchArr[1];
      objBranch.branch = branchArr[2];
      objBranch.address = branchArr[3];
      objBranch.city = branchArr[4];
      objBranch.district = branchArr[5];
      objBranch.state = branchArr[6];
      objBranch.save
    end
  end  
end  