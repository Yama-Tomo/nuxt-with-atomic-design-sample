class SearchEmployees
  def initialize(params)
    @params = params
  end

  def execute
    rows = fetch_rows.condition(@params).pagination(@params)

    {
      data_sets: resolve_n_plus_one(rows),
      total_count: fetch_rows.condition(@params).size,
    }
  end

  private

  def resolve_n_plus_one(rows)
    mapped_data = EmployeeBranch.includes(branch: :group).where(employee_id: rows.map(&:id)).group_by(&:employee_id)

    rows.tap do |this|
      this.each do |row|
        branches = []
        branch_by_group = {}

        mapped_data[row.id].each do |employee_branch|
          branches << employee_branch.branch
          branch_by_group[employee_branch.branch.id] = employee_branch.branch.group
        end

        row.association(:branches).target = branches
        row.branches.each do |branch|
          branch.association(:group).target = branch_by_group[branch.id]
        end
      end
    end
  end

  def fetch_rows
    Employee.distinct.joins(:branches, :groups).tap do |this|
      def this.condition(params)
        relation = self
        relation = relation.where(groups: { id: params[:group] }) if params[:group].present?
        relation = relation.where(employee_branches: { branch_id: params[:branch] }) if params[:branch].present?
        relation = relation.where('first_name || last_name LIKE ?', "%#{params[:name]}%") if params[:name].present?
        relation = relation.where(sex_id: params[:sex])           if params[:sex].present?
        relation = relation.where(country_id: params[:country])   if params[:country].present?

        relation
      end

      def this.pagination(params)
        desc = params[:descending].present? ? :DESC : ''

        relation = self
        relation = relation.order(Arel.sql "id #{desc}")          if params[:sortBy] == 'id'
        relation = relation.order(Arel.sql "first_name #{desc}")
                  .order(Arel.sql "last_name #{desc}")            if params[:sortBy] == 'name'
        relation = relation.order(Arel.sql "groups.id #{desc}")   if params[:sortBy] == 'group_name'
        relation = relation.order(Arel.sql "branches.id #{desc}") if params[:sortBy] == 'branch_name'
        relation = relation.order(Arel.sql "sex_id #{desc}")      if params[:sortBy] == 'sex'
        relation = relation.order(Arel.sql "country_id #{desc}")  if params[:sortBy] == 'country'

        relation = relation.limit(params[:rowsPerPage]) if params[:rowsPerPage].present?
        relation = relation.offset((params[:page].to_i - 1) * params[:rowsPerPage].to_i) if params[:page].present?

        relation
      end
    end
  end
end
