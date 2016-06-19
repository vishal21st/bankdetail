require 'csv'

class Seed
  def self.enterData
    branches = CSV.read('bank_branches.csv')
    count = 0;
    # puts branches[1].length
    branches.each do |branchArr|
      count = count+1
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
